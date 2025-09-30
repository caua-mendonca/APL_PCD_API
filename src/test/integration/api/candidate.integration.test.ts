import request from 'supertest';
import express from 'express';
import { createCandidateController, getCandidatesController } from '../../../controller/user/candidateController.js';

const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/api/candidates', async (req, res) => {
  try {
    const [status, message] = await createCandidateController(req.body);
    res.status(status).json({ message });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.get('/api/candidates', async (req, res) => {
  try {
    const [status, data] = await getCandidatesController();
    res.status(status).json({ data });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

describe('Candidate API Integration Tests', () => {
  const validCandidateData = {
    name: 'João Silva',
    email: 'joao@example.com',
    confirm_email: 'joao@example.com',
    password: 'password123',
    confirm_password: 'password123',
    phone: '11999999999',
    cpf: '11144477735',
    birth_date: '1990-01-01',
    motor_disability: false,
    hearing_disability: true,
    visual_disability: false,
    sub_type: 'SUBT-123456',
    barrier: 'BARR-123456',
    accessibility: 'ACES-123456'
  };

  describe('POST /api/candidates', () => {
    test('should create candidate with valid data', async () => {
      const response = await request(app)
        .post('/api/candidates')
        .send(validCandidateData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
    });

    test('should reject candidate with invalid data', async () => {
      const invalidData = { ...validCandidateData, email: 'invalid-email' };
      
      const response = await request(app)
        .post('/api/candidates')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });

    test('should reject candidate with missing required fields', async () => {
      const incompleteData = { name: 'João Silva' };
      
      const response = await request(app)
        .post('/api/candidates')
        .send(incompleteData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/candidates', () => {
    test('should get all candidates', async () => {
      const response = await request(app)
        .get('/api/candidates')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });
  });
});