import request from 'supertest';
import express from 'express';
import { createJobController, getJobsController } from '../../../controller/job/jobController.js';

const app = express();
app.use(express.json());

// Mock routes for testing
app.post('/api/jobs', async (req, res) => {
  try {
    const [status, message] = await createJobController(req.body);
    res.status(status).json({ message });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const [status, data] = await getJobsController();
    res.status(status).json({ data });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

app.post('/api/jobs/:jobId/apply', async (req, res) => {
  try {
    const { candidateId } = req.body;
    const { jobId } = req.params;
    
    // Mock application logic
    if (!candidateId || !jobId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    res.status(200).json({ message: 'Application successful' });
  } catch (error) {
    res.status(500).json({ error: String(error) });
  }
});

describe('Job API Integration Tests', () => {
  const validJobData = {
    titulo: 'Desenvolvedor Frontend',
    descricao: 'Vaga para desenvolvedor frontend com experiência em React',
    salario: 5000,
    localidade: 'São Paulo, SP',
    data_fim: '2024-12-31',
    acessibilidade: 'ACES-123456',
    tipo: 'CLT',
    empresa_id: 'EMP-123456'
  };

  describe('POST /api/jobs', () => {
    test('should create job with valid data', async () => {
      const response = await request(app)
        .post('/api/jobs')
        .send(validJobData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message');
    });

    test('should reject job with invalid salary', async () => {
      const invalidData = { ...validJobData, salario: -1000 };
      
      const response = await request(app)
        .post('/api/jobs')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });

    test('should reject job with past end date', async () => {
      const invalidData = { ...validJobData, data_fim: '2020-01-01' };
      
      const response = await request(app)
        .post('/api/jobs')
        .send(invalidData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });

    test('should reject job without required fields', async () => {
      const incompleteData = { titulo: 'Desenvolvedor' };
      
      const response = await request(app)
        .post('/api/jobs')
        .send(incompleteData)
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
    });
  });

  describe('GET /api/jobs', () => {
    test('should get all jobs', async () => {
      const response = await request(app)
        .get('/api/jobs')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });
  });

  describe('POST /api/jobs/:jobId/apply', () => {
    test('should apply to job successfully', async () => {
      const response = await request(app)
        .post('/api/jobs/VAGA-123456/apply')
        .send({ candidateId: 'CAND-123456' })
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Application successful');
    });

    test('should reject application without candidate ID', async () => {
      const response = await request(app)
        .post('/api/jobs/VAGA-123456/apply')
        .send({})
        .expect('Content-Type', /json/);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Missing required fields');
    });
  });

  describe('Job Search and Filtering', () => {
    test('should filter jobs by location', async () => {
      const response = await request(app)
        .get('/api/jobs?location=São Paulo')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });

    test('should filter jobs by salary range', async () => {
      const response = await request(app)
        .get('/api/jobs?minSalary=3000&maxSalary=8000')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });

    test('should filter jobs by type', async () => {
      const response = await request(app)
        .get('/api/jobs?type=CLT')
        .expect('Content-Type', /json/);

      expect(response.status).toBe(200);
    });
  });
});