import { validateIdByRelation } from "../../../validation/validateId/validateId.js";
import { Colaborador } from "../../entities/class/Employee.js";
import * as DB from "../../../repositories/user/employeeRepository.js";
import { selectFromIdWhere } from "../../../repositories/shared/commonRepository.js";
import { error } from "console";

export let createEmployee = async (
  user: { name: string; email: string; senha: string; setor: string },
  id_empresa: string
): Promise<[number, any]> => {
  console.log("[POST / MODEL Colaborador]");
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
    return [500, String(process.env.STATUS_500)];
  }
};

/**
 * Busca um colaborador específico.
 */
export let getEmployee = async (table: string, id: string): Promise<any> => {
  console.log("[GET / MODEL Colaborador]");
  try {
    let [status, message] = await selectFromIdWhere(table, id);
    return [status, message];
  } catch (error) {
    return [500, String(process.env.STATUS_500)];
  }
};
