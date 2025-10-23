import dotenv from "dotenv";
dotenv.config({ path: ".env.routes" });

/**
 * Definição das rotas da aplicação para operações CRUD
 * e funcionalidades específicas, organizadas por entidade.
 * Todas as rotas são carregadas a partir do arquivo de variáveis de ambiente.
 */

/**
 * ================================
 * Rotas do recurso Candidato
 * ================================
 * CRUD completo para gerenciar candidatos.
 */
 
export const createCandidate: string = String(process.env.CREATE_CANDIDATO);
export const getCandidate: string = String(process.env.GET_CANDIDATO);
export const getCandidateByEmail: string = String(process.env.GET_CANDIDATO_BY_EMAIL);
export const deleteCandidate: string = String(process.env.DELETE_CANDIDATO);
export const updateCandidate: string = String(process.env.UPDATE_CANDIDATO);

/**
 * ================================
 * Rotas do recurso Contratante
 * ================================
 * CRUD completo para gerenciar contratantes.
 */
export const createCompany: string = String(process.env.CREATE_CONTRATANTE);
export const getCompany: string = String(process.env.GET_CONTRATANTE);
export const getCompanyByEmail: string = String(process.env.GET_CONTRATANTE_BY_EMAIL);
export const deleteCompany: string = String(process.env.DELETE_CONTRATANTE);
export const updateCompany: string = String(process.env.UPDATE_CONTRATANTE);

/**
 * ================================
 * Rotas do recurso Colaborador
 * ================================
 * Operações relacionadas a colaboradores, vinculados a empresas (ID como parâmetro).
 */
export const createEmployee: string = String(process.env.CREATE_COLABORADOR);
export const getEmployee: string = String(process.env.GET_COLABORADOR);

/**
 * ================================
 * Rotas do recurso Vaga
 * ================================
 * CRUD e operações de candidatura de vagas, incluindo consultas por candidato.
 */
export const createJob: string = String(process.env.CREATE_VAGA);
export const applyToJob: string = String(process.env.REGISTER_VAGA);
export const getJobs: string = String(process.env.GET_VAGAS);
export const getJobById: string = String(process.env.GET_VAGAS_BY_ID);
export const getJobsByCandidate: string = String(process.env.GET_VAGA_BY_CANDIDATE);
export const deleteJob: string = String(process.env.DELETE_VAGA);
export const updateJob: string = String(process.env.UPDATE_VAGA);

/**
 * ================================
 * Rotas do recurso Evento
 * ================================
 * CRUD para eventos vinculados a empresas e calendários.
 */
export const createEvent: string = String(process.env.CREATE_EVENTO);
export const getEvent: string = String(process.env.GET_EVENTO);
export const deleteEvent: string = String(process.env.DELETE_EVENTO);

/**
 * ================================
 * Rotas do recurso Calendário
 * ================================
 * Operações de criação e consulta de calendários.
 */
export const createCalendar: string = String(process.env.CREATE_CALENDARIO);
export const getCalendar: string = String(process.env.GET_CALENDARIO);

/**
 * ================================
 * Rotas de Login
 * ================================
 * Autenticação de usuários: candidatos, empresas e administradores.
 */
export const loginCandidate: string = String(process.env.LOGIN_CAND);
export const loginCompany: string = String(process.env.LOGIN_EMP);
export const loginAdmin: string = String(process.env.LOGIN_ADM);

/**
 * ================================
 * Rota de alteração de senha
 * ================================
 */
export const changePassword: string = String(process.env.CHANGE_PASSWORD);

/**
 * ================================
 * Rotas ADM
 * ================================
 * Criação de barreira, acessibilidade e subtipo.
 */
export const createBarrier: string = String(process.env.CREATE_BARREIRA);
export const createAccessibility: string = String(process.env.CREATE_ACESSIBILIDADE);
export const createSubType: string = String(process.env.CREATE_SUBTIPO);
export const getAnalyticData: string = String(process.env.GET_DADOS_ANALITICOS);
