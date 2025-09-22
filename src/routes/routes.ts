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
export let createCanditado: string = String(process.env.CREATE_CANDIDATO);
export let getCanditado: string = String(process.env.GET_CANDIDATO);
export let getCanditadoByName: string = String(process.env.GET_CANDIDATO_BY_ID);
export let deleteCanditado: string = String(process.env.DELETE_CANDIDATO);
export let updateCanditado: string = String(process.env.UPDATE_CANDIDATO);

/**
 * ================================
 * Rotas do recurso Contratante
 * ================================
 * CRUD completo para gerenciar contratantes.
 */
export let createContratante: string = String(process.env.CREATE_CONTRATANTE);
export let getContratante: string = String(process.env.GET_CONTRATANTE);
export let getContratanteById: string = String(process.env.GET_CONTRATANTE_BY_ID);
export let deleteContratante: string = String(process.env.DELETE_CONTRATANTE);
export let updateContratante: string = String(process.env.UPDATE_CONTRATANTE);

/**
 * ================================
 * Rotas do recurso Colaborador
 * ================================
 * Operações relacionadas a colaboradores, vinculados a empresas (ID como parâmetro).
 */
export let createColaborador: string = String(process.env.CREATE_COLABORADOR);
export let getColaborador: string = String(process.env.GET_COLABORADOR);

/**
 * ================================
 * Rotas do recurso Vaga
 * ================================
 * CRUD e operações de candidatura de vagas, incluindo consultas por candidato.
 */
export let createVaga: string = String(process.env.CREATE_VAGA);
export let candidatarVaga: string = String(process.env.REGISTER_VAGA);
export let getVagas: string = String(process.env.GET_VAGAS);
export let getVagasById: string = String(process.env.GET_VAGAS_BY_ID);
export let getVagasByCandidato: string = String(process.env.GET_VAGA_BY_CANDIDATE);
export let deleteVaga: string = String(process.env.DELETE_VAGA);
export let updateVaga: string = String(process.env.UPDATE_VAGA);

/**
 * ================================
 * Rotas do recurso Evento
 * ================================
 * CRUD para eventos vinculados a empresas e calendários.
 */
export let createEvento: string = String(process.env.CREATE_EVENTO);
export let getEvento: string = String(process.env.GET_EVENTO);
export let deleteEvento: string = String(process.env.DELETE_EVENTO);

/**
 * ================================
 * Rotas do recurso Calendário
 * ================================
 * Operações de criação e consulta de calendários.
 */
export let createCalendario: string = String(process.env.CREATE_CALENDARIO);
export let getCalendario: string = String(process.env.GET_CALENDARIO);

/**
 * ================================
 * Rotas de Login
 * ================================
 * Autenticação de usuários: candidatos, empresas e administradores.
 */
export let loginCand: string = String(process.env.LOGIN_CAND);
export let loginEmp: string = String(process.env.LOGIN_EMP);
export let loginAdm: string = String(process.env.LOGIN_ADM);

/**
 * ================================
 * Rota de alteração de senha
 * ================================
 */
export let changePassword: string = String(process.env.CHANGE_PASSWORD);

/**
 * ================================
 * Rotas ADM
 * ================================
 * Criação de barreira, acessibilidade e subtipo.
 */
export let createBarreira: string = String(process.env.CREATE_BARREIRA);
export let createAcessibilidade: string = String(process.env.CREATE_ACESSIBILIDADE);
export let createSubTipo: string = String(process.env.CREATE_SUBTIPO);
