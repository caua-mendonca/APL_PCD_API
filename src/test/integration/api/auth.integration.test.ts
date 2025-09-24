import request from 'supertest';
import express from 'express';
import JWT from 'jsonwebtoken';
import { authenticateTokenCand } from '../../../middleware/middleware.js';

const app = express();
app.use(express.json());

// Protected route for testing
app.get('/api/protected', authenticateTokenCand, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// Login mock route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'test@example.com' && password === 'password123') {
    const token = JWT.sign(
      { id: 'CAND-123456', email },
      process.env.SECRET_CAND || 'test-secret',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

describe('Authentication Integration Tests', () => {
  beforeEach(() => {
    process.env.SECRET_CAND = 'test-secret-cand';
  });

  describe('Login Flow', () => {
    test('should login with valid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(typeof response.body.token).toBe('string');
    });

    test('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect('Content-Type', /json/);

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Invalid credentials');
    });
  });

  describe('Protected Routes', () => {
    test('should access protected route with valid token', async () => {
      // First login to get token
      const loginResponse = await request(app)
        .post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      const token = loginResponse.body.token;

      // Then access protected route
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Access granted');
      expect(response.body.user).toHaveProperty('id', 'CAND-123456');
    });

    test('should reject access without token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(401);
      expect(response.body.msg).toBe('Não autorizado!');
    });

    test('should reject access with invalid token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalid-token')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(403);
      expect(response.body.msg).toBe('Token inválido!');
    });

    test('should reject access with malformed authorization header', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'invalid-format')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(403);
      expect(response.body.msg).toBe('Token inválido!');
    });
  });

  describe('Token Expiration', () => {
    test('should reject expired token', async () => {
      const expiredToken = JWT.sign(
        { id: 'CAND-123456', email: 'test@example.com' },
        process.env.SECRET_CAND || 'test-secret',
        { expiresIn: '-1h' } // Expired 1 hour ago
      );

      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(403);
      expect(response.body.msg).toBe('Token inválido!');
    });
  });
});