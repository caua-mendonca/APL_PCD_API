import dotenv from "dotenv";
dotenv.config({ path: ".env.routes" });
/**
 * Definição das rotas da aplicação para as operações CRUD
 * e funcionalidades específicas, organizadas por entidade.
 */
// Rotas para o recurso Candidato
export let createCanditado = String(process.env.CREATE_CANDIDATO);
export let getCanditado = String(process.env.GET_CANDIDATO);
export let getCanditadoById = String(process.env.GET_CANDIDATO_BY_ID);
export let deleteCanditado = String(process.env.DELETE_CANDIDATO);
export let updateCanditado = String(process.env.UPDATE_CANDIDATO);
// Rotas para o recurso Contratante
export let createContratante = String(process.env.CREATE_CONTRATANTE);
export let getContratante = String(process.env.GET_CONTRATANTE);
export let getContratanteById = String(process.env.GET_CONTRATANTE_BY_ID);
export let deleteContratante = String(process.env.DELETE_CONTRATANTE);
export let updateContratante = String(process.env.UPDATE_CONTRATANTE);
// Rotas para o recurso Colaborador, com ID como parâmetro
export let createColaborador = String(process.env.CREATE_COLABORADOR);
export let getColaborador = String(process.env.GET_COLABORADOR);
// Rotas para o recurso Vaga, com ID como parâmetro
export let createVaga = String(process.env.CREATE_VAGA);
export let candidatarVaga = String(process.env.REGISTER_VAGA);
export let getVagas = String(process.env.GET_VAGAS);
export let getVagasById = String(process.env.GET_VAGAS_BY_ID);
export let deleteVaga = String(process.env.DELETE_VAGA);
// Rotas para o recurso Evento, com ID como parâmetro
export let createEvento = String(process.env.CREATE_EVENTO);
export let getEvento = String(process.env.GET_EVENTO);
export let deleteEvento = String(process.env.DELETE_EVENTO);
// Rotas para o recurso Calendario, com ID como parâmetro
export let createCalendario = String(process.env.CREATE_CALENDARIO);
export let getCalendario = String(process.env.GET_CALENDARIO);
