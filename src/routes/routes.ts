import dotenv from "dotenv";
dotenv.config({path: ".env.routes"});

/**
 * Definição das rotas da aplicação para as operações CRUD
 * e funcionalidades específicas, organizadas por entidade.
 */

// Rotas para o recurso Candidato
export let createCanditado: string = String(process.env.CREATE_CANDIDATO);
export let getCanditado: string = String(process.env.GET_CANDIDATO);
export let getCanditadoById: string = String(process.env.GET_CANDIDATO_BY_ID);
export let deleteCanditado: string = String(process.env.DELETE_CANDIDATO);
export let updateCanditado: string = String(process.env.UPDATE_CANDIDATO);

// Rotas para o recurso Contratante
export let createContratante: string = String(process.env.CREATE_CONTRATANTE);
export let getContratante: string = String(process.env.GET_CONTRATANTE);
export let getContratanteById: string = String(process.env.GET_CONTRATANTE_BY_ID);
export let deleteContratante: string = String(process.env.DELETE_CONTRATANTE);
export let updateContratante: string = String(process.env.UPDATE_CONTRATANTE);

// Rotas para o recurso Colaborador, com ID como parâmetro
export let createColaborador: string = String(process.env.CREATE_COLABORADOR);
export let getColaborador: string = String(process.env.GET_COLABORADOR);

// Rotas para o recurso Vaga, com ID como parâmetro
export let createVaga: string = String(process.env.CREATE_VAGA);
export let candidatarVaga: string = String(process.env.REGISTER_VAGA);
export let getVagas: string = String(process.env.GET_VAGAS);
export let getVagasById: string = String(process.env.GET_VAGAS_BY_ID);
export let deleteVaga: string = String(process.env.DELETE_VAGA);
export let updateVaga: string = String(process.env.UPDATE_VAGA);

// Rotas para o recurso Evento, com ID como parâmetro
export let createEvento: string = String(process.env.CREATE_EVENTO);
export let getEvento: string = String(process.env.GET_EVENTO);
export let deleteEvento: string = String(process.env.DELETE_EVENTO);

// Rotas para o recurso Calendario, com ID como parâmetro
export let createCalendario: string = String(process.env.CREATE_CALENDARIO);
export let getCalendario: string = String(process.env.GET_CALENDARIO)

// Rotas para o recurso de login
export let loginCand:string = String(process.env.LOGIN_CAND);
export let loginEmp:string = String(process.env.LOGIN_EMP);
export let loginAdm:string = String(process.env.LOGIN_ADM);

// Rora para mudar senha
export let changePassword:string = String(process.env.CHANGE_PASSWORD);