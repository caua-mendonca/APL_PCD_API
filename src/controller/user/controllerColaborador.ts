import * as Model from "../../model/user/colaborador/modelColaborador.js";
import * as modelVaga from "../../model/vaga/modelVaga.js";
import * as modelEvento from "../../model/event/modelEvent.js";
import * as modelCalendar from "../../model/calendar/modelCalendar.js";

/**
 * Controller para criação de um novo colaborador.
 * Recebe dados do colaborador e o ID da empresa para associação.
 * @param user - Dados do colaborador a ser criado
 * @param id_empresa - ID da empresa associada ao colaborador
 * @returns resposta da criação (sucesso ou erro)
 */
export let controllerColaborador = async (
  user: {
    name: string;
    email: string;
    senha: string;
    setor: string;
  },
  id_empresa: string
) => {
  console.log("[POST / CONTROLLER Colaborador]");
  try {
    let [status, message] = await Model.createColaborador(user, id_empresa);
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Controller para obter colaboradores de uma tabela associada a um ID.
 * @param table - Nome da tabela para consulta (ex: "tb_empresa")
 * @param id - ID associado para filtro
 * @returns lista de colaboradores encontrados
 */
export let controllerGetColaborador = async (table: string, id: string) => {
  console.log("[POST / CONTROLLER Colaborador]");
  try {
    let [status, message] = await Model.getColaborador(table, id);
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Controller para criação de uma vaga associada a uma empresa.
 * @param vaga - Dados da vaga a ser criada
 * @param id_empresa - ID da empresa que cria a vaga
 * @returns resultado da criação da vaga (sucesso ou erro)
 */
/**
 * Insere uma nova vaga vinculada a uma empresa.
 * @param vaga - Objeto contendo os detalhes da vaga (data de fim, título, descrição, salário, localidade, acessibilidade).
 * @param id_empresa - Identificador da empresa que está cadastrando a vaga.
 * @returns Resultado da criação da vaga, conforme resposta do model.
 */
export let postVaga = async (
  vaga: {
    data_fim: Date;
    titulo: string;
    descricao: string;
    salario: number;
    localidade: string;
    tipo:string
  },
  id_empresa: string
): Promise<any> => {
  console.log("[POST / CONTROLLER Vaga]");
  try {
    let [status, message] = await modelVaga.createVaga(vaga, id_empresa);
    return [status, message];
  } catch (error) {
    return;
  }
};

/**
 * Obtém todas as vagas disponíveis no sistema.
 * @returns Array com as vagas encontradas.
 * @throws Erro caso a consulta falhe.
 */
export let getVaga = async () => {
  console.log("[GET / CONTROLLER Vaga]");
  try {
    let [staus, messgae] = await modelVaga.getVagaModel();
    return [staus, messgae];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Busca uma vaga pelo seu identificador único.
 * @param id - Identificador da vaga a ser buscada.
 * @returns Vaga correspondente ao ID informado.
 * @throws Erro caso a consulta falhe.
 */
export let getVagaById = async (id: string):Promise<any> => {
  console.log("[GET / CONTROLLER Vaga]");
  try {
    let [status, message] = await modelVaga.getVagaById(id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Remove uma vaga do sistema a partir do seu identificador.
 * @param id - Identificador da vaga a ser deletada.
 * @returns Resultado da operação de deleção.
 * @throws Erro caso a deleção falhe.
 */
export let deleteVaga = async (id: string):Promise<any> => {
  console.log("[DELETE / CONTROLLER Vaga]");
  try {
    let [status, message] = await modelVaga.deleteVaga(id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export let updateVaga = async (body:any, id:string):Promise<any>=>{
  console.log("[UPDATE / CONTROLLER Vaga]");
  try {
    let [status, message] = await modelVaga.updateVaga(body, id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
}

/**
 * Insere um novo evento associado a um calendário e candidato.
 * @param evento - Objeto contendo detalhes do evento (título, descrição, data, horário de início e fim, id do candidato).
 * @param id_calendario - Identificador do calendário ao qual o evento será vinculado.
 * @returns Resultado da criação do evento conforme resposta do model.
 */
export let postEvento = async (
  evento: {
    titulo: string;
    descricao: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    id_candidato: string;
  },
  id_calendario: string
): Promise<any> => {
  console.log("[POST / CONTROLLER Evento]");
  try {
    let [status, message] = await modelEvento.createEvento(
      evento,
      id_calendario
    );
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Obtém todos os eventos cadastrados no sistema.
 * @returns Array com os eventos encontrados.
 * @throws Erro caso a consulta falhe.
 */
export let getEvento = async (id: string) => {
  console.log("[GET / CONTROLLER Evento]");
  try {
    let [status, message] = await modelEvento.getEvento(id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Remove um evento do sistema a partir do seu identificador.
 * @param id - Identificador do evento a ser deletado.
 * @returns Resultado da operação de deleção.
 * @throws Erro caso a deleção falhe.
 */
/**
 * Exclui um evento com base no ID fornecido.
 * @param id - Identificador único do evento a ser deletado.
 * @returns Retorna a resposta da exclusão do evento.
 */
export let deleteEvento = async (id: string):Promise<any> => {
  try {
    console.log(`[DELETE / CONTROLLER Evento]`, {
      eventoId: id,
    });

    const [status, messgae] = await modelEvento.deleteEvento(id);

    return [status, messgae];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Cria um calendário para um determinado identificador.
 * @param id - Identificador associado ao calendário.
 * @returns Retorna a resposta da criação do calendário.
 */
export let postCalendario = async (id: string): Promise<any> => {
  console.log(`[POST / CONTROLLER Calendario]`);

  try {
    const [status, message] = await modelCalendar.createCalendario(id);
    return [status, message]
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Recupera o calendário para o mês e ano atuais, incluindo eventos vinculados a um ID específico.
 * @param id - Identificador associado aos eventos.
 * @returns Retorna a lista de calendários e eventos encontrados.
 */
export let getCalendario = async (id: string) => {
  console.log(`[GET / CONTROLLER Calendario]`);
  try {

    let eventos = await modelEvento.getEvento(id);

    const mesAtual = new Date().getMonth() + 1;
    const anoAtual = new Date().getFullYear();

    let [status, message] = await modelCalendar.getCalendario(
      mesAtual,
      anoAtual,
      eventos
    );

    return [status, message] ;
  } catch (error) {

  }
};
