import { IService } from './interfaces/IService.js';
import * as CandidateModel from '../model/user/candidate/candidateModel.js';
import * as JobModel from '../model/job/jobModel.js';

export interface CandidateData {
  name: string;
  email: string;
  confirme_email: string;
  senha: string;
  confirme_senha: string;
  telefone: string;
  cpf: string;
  data_nascimento: Date;
  def_motora: boolean;
  def_auditiva: boolean;
  def_visual: boolean;
  sub_tipo: string;
  barreira: string;
  acessbilidade: string;
}

export class CandidateService implements IService<CandidateData, any> {
  async create(data: CandidateData): Promise<[number, string]> {
    return await CandidateModel.createCandidate(data);
  }

  async getById(id: string): Promise<[number, any]> {
    return await CandidateModel.getUserById(id);
  }

  async getAll(): Promise<[number, any[] | string]> {
    return await CandidateModel.getUser('tb_candidato');
  }

  async update(id: string, data: Partial<CandidateData>): Promise<[number, string]> {
    return await CandidateModel.updateUser('tb_candidato', id, data);
  }

  async delete(id: string): Promise<[number, string]> {
    return await CandidateModel.deleteUser('tb_candidato', id);
  }

  async getByName(name: string): Promise<[number, any]> {
    return await CandidateModel.getUserByName('tb_candidato', name);
  }

  async applyToJob(candidateId: string, jobId: string): Promise<[number, string]> {
    return await JobModel.registerCandidateToVaga(candidateId, jobId);
  }
}