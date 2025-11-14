import * as Model from "../../model/user/employee/employeeModel.js";
import * as modelJob from "../../model/job/jobModel.js";
import * as modelEvent from "../../model/event/eventModel.js";
import * as modelCalendar from "../../model/calendar/calendarModel.js";
import {logger} from "../../utils/logger.js";


/**
 * Controller para criação de um novo colaborador.
 * Recebe dados do colaborador e o ID da empresa para associação.
 * @param user - Dados do colaborador a ser criado
 * @param id_empresa - ID da empresa associada ao colaborador
 * @returns resposta da criação (sucesso ou erro)
 */
export const createEmployeeController = async (
  user: {
    name: string;
    email: string;
    password: string;
    department: string;
  },
  company_id: string
) => {
  logger.info("[POST / CONTROLLER Employee]");
  try {
    const mappedUser = {
      name: user.name,
      email: user.email,
      senha: user.password,
      setor: user.department,
    };
    logger.debug("Mapped User:", {mappedUser: mappedUser});
    logger.debug("Company ID:", {companyId: company_id});
    const [status, message] = await Model.createEmployee(mappedUser, company_id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Controller para obter colaboradores de uma tabela associada a um ID.
 * @param table - Nome da tabela para consulta (ex: "tb_empresa")
 * @param id - ID associado para filtro
 * @returns lista de colaboradores encontrados
 */
export const getEmployeeController = async (table: string, id: string) => {
  logger.info("[GET / CONTROLLER Employee]");
  try {
    const [status, message] = await Model.getEmployee(table, id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
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
export const createJobController = async (
  job: {
    end_date: Date;
    title: string;
    description: string;
    salary: number;
    location: string;
    type: string,
    type_acessibility: string;
    acessibility:string;
  },
  company_id: string
): Promise<any> => {
  logger.info("[POST / CONTROLLER Job]");
  try {
    const mappedJob = {
      data_fim: job.end_date,
      titulo: job.title,
      descricao: job.description,
      salario: job.salary,
      localidade: job.location,
      tipo: job.type,
      tipo_acess: job.type_acessibility,
      acessibility: job.acessibility
    };
    const [status, message] = await modelJob.createJob(mappedJob, company_id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Obtém todas as vagas disponíveis no sistema.
 * @returns Array com as vagas encontradas.
 * @throws Erro caso a consulta falhe.
 */
export const getJobsController = async () => {
  logger.info("[GET / CONTROLLER Job]");
  try {
    const [status, message] = await modelJob.getJobsModel();
    return [status, message];
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
export const getJobByIdController = async (id: string): Promise<any> => {
  logger.info("[GET / CONTROLLER Job]");
  try {
    const [status, message] = await modelJob.getJobById(id);
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
export const deleteJobController = async (id: string): Promise<any> => {
  logger.info("[DELETE / CONTROLLER Job]");
  try {
    const [status, message] = await modelJob.deleteJob(id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

export const updateJobController = async (body: any, id: string): Promise<any> => {
  logger.info("[UPDATE / CONTROLLER Job]");
  try {
    const [status, message] = await modelJob.updateJob(body, id);
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
export const createEventController = async (
  event: {
    title: string;
    description: string;
    date: Date;
    start_time: string;
    end_time: string;
    candidate_id: string;
  },
  calendar_id: string
): Promise<any> => {
  logger.info("[POST / CONTROLLER Event]");
  try {
    const mappedEvent = {
      titulo: event.title,
      descricao: event.description,
      data: event.date,
      hora_inicio: event.start_time,
      hora_fim: event.end_time,
      id_candidato: event.candidate_id,
    };
    const [status, message] = await modelEvent.createEvent(
      mappedEvent,
      calendar_id
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
export const getEventController = async (id: string) => {
  logger.info("[GET / CONTROLLER Event]");
  try {
    const [status, message] = await modelEvent.getEvent(id);
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
export const deleteEventController = async (id: string): Promise<any> => {
  try {
    logger.info(`[DELETE / CONTROLLER Event]`, {
      eventId: id,
    });

    const [status, message] = await modelEvent.deleteEvent(id);

    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Cria um calendário para um determinado identificador.
 * @param id - Identificador associado ao calendário.
 * @returns Retorna a resposta da criação do calendário.
 */
export const createCalendarController = async (id: string): Promise<any> => {
  logger.info(`[POST / CONTROLLER Calendar]`);

  try {
    const [status, message] = await modelCalendar.createCalendar(id);
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
export const getCalendarController = async (id: string) => {
  logger.info(`[GET / CONTROLLER Calendar]`);
  try {

    const events = await modelEvent.getEvent(id);

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const [status, message] = await modelCalendar.getCalendar(
      currentMonth,
      currentYear,
      events
    );

    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};
