import request from 'supertest';
import express from 'express';
import { createCompanyController, getCompaniesController } from '../../../controller/user/companyController.js';

const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/api/companies', async (req, res) => {
  try {
    const [status, message] = await createCompanyController(req.body);
    res.status(status).json({ message });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.get('/api/companies', async (req, res) => {
  try {
    const [status, data] = await getCompaniesController();
    res.status(status).json({ data });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

describe('Company API Integration Tests', () => {
  const validCompanyData = {
    nome_fantasia: 'Tech Solutions',
    razao_social: 'Tech Solutions Ltda',
    email: 'contato@techsolutions.com',
    confirme_email: 'contato@techsolutions.com',
    senha: 'password123',
    confirme_senha: 'password123',
    cnpj: '12345678000195',
    telefone: '11999999999',
    acessibilidade: 'ACES-123456'
  };

  describe('POST /api/companies', () => {
    test('should create company with valid data', async () => {
      const response = await request(app)
        .post('/api/companies')
        .send(validCompanyData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
    });

    test('should reject company with invalid CNPJ', async () => {
      const invalidData = { ...validCompanyData, cnpj: '12345678000000' };
      
      const response = await request(app)
        .post('/api/companies')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });

    test('should reject company with mismatched emails', async () => {
      const invalidData = { 
        ...validCompanyData, 
        confirme_email: 'different@example.com' 
      };
      
      const response = await request(app)
        .post('/api/companies')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });

    test('should reject company with mismatched passwords', async () => {
      const invalidData = { 
        ...validCompanyData, 
        confirme_senha: 'differentpassword' 
      };
      
      const response = await request(app)
        .post('/api/companies')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/companies', () => {
    test('should get all companies', async () => {
      const response = await request(app)
        .get('/api/companies')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });
  });
});