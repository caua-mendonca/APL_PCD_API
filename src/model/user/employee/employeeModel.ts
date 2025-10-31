import { validateIdByRelation } from "../../../validation/validateId/validateId.js";
import { Colaborador } from "../../entities/class/Employee.js";
import * as DB from "../../../repositories/user/employeeRepository.js";
import {logger} from "../../../utils/logger.js";

export let createEmployee = async (
  user: { name: string; email: string; senha: string; setor: string },
  id_empresa: string
): Promise<[number, any]> => {
  logger.info("[POST / MODEL Colaborador]");
  try {
    let errorLog: string[] = [];

    let result = await validateIdByRelation(id_empresa, "tb_empresa", "id");
    if (result === false) {
      errorLog.push(`Empresa ${id_empresa} nao encontrada`);
    }
    let colaborador = new Colaborador(
      user.name,
      user.email,
      user.senha,
      user.setor
    );
    colaborador.setId();
    await DB.insertEmployee(
      colaborador.id,
      colaborador.name,
      colaborador.email,
      colaborador.senha,
      colaborador.setor
    );
    await DB.updateEmployeeCompany(colaborador.id, id_empresa);
    let [status, message] = await DB.insertCompanyEmployee(
      colaborador.id,
      id_empresa
    );
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};

/**
 * Busca um colaborador específico.
 */
export let getEmployee = async (table: string, id: string): Promise<any> => {
  logger.info("[GET / MODEL Colaborador]");
  try {
    let [status, message] = await DB.getEmployee(id);
    return [status, message];
  } catch (error) {
    return [500, String(error)];
  }
};
