import { Vaga } from '../../../model/entities/class/Job.js';

describe('Job Entity', () => {
  const mockJobData = {
    data_fim: new Date('2024-12-31'),
    titulo: 'Desenvolvedor Frontend',
    descricao: 'Vaga para desenvolvedor frontend com experiência em React',
    salario: 5000,
    localidade: 'São Paulo, SP',
    acessibilidade: 'ACES-123456',
    tipo: 'CLT'
  };

  test('should create job with correct properties', () => {
    const job = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    expect(job.titulo).toBe(mockJobData.titulo);
    expect(job.descricao).toBe(mockJobData.descricao);
    expect(job.salario).toBe(mockJobData.salario);
    expect(job.localidade).toBe(mockJobData.localidade);
    expect(job.acessibilidade).toBe(mockJobData.acessibilidade);
    expect(job.tipo).toBe(mockJobData.tipo);
    expect(job.data_fim).toBe(mockJobData.data_fim);
  });

  test('should initialize with default values', () => {
    const job = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    expect(job.id).toBe('');
    expect(job.status).toBe(true);
    expect(job.data_inicio).toBeInstanceOf(Date);
  });

  test('should set data_inicio to current date', () => {
    const beforeCreation = new Date();
    
    const job = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    const afterCreation = new Date();

    expect(job.data_inicio.getTime()).toBeGreaterThanOrEqual(beforeCreation.getTime());
    expect(job.data_inicio.getTime()).toBeLessThanOrEqual(afterCreation.getTime());
  });

  test('should generate job ID with VAGA prefix', () => {
    const job = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    job.setId(''); // Parameter is not used in the method
    expect(job.id).toMatch(/^VAGA-\d{1,6}$/);
  });

  test('should handle different salary values', () => {
    const jobWithHighSalary = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      15000,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    const jobWithLowSalary = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      1500,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      mockJobData.tipo
    );

    expect(jobWithHighSalary.salario).toBe(15000);
    expect(jobWithLowSalary.salario).toBe(1500);
  });

  test('should handle different job types', () => {
    const cltJob = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      'CLT'
    );

    const pjJob = new Vaga(
      mockJobData.data_fim,
      mockJobData.titulo,
      mockJobData.descricao,
      mockJobData.salario,
      mockJobData.localidade,
      mockJobData.acessibilidade,
      'PJ'
    );

    expect(cltJob.tipo).toBe('CLT');
    expect(pjJob.tipo).toBe('PJ');
  });
});