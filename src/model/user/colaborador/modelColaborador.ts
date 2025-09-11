import { validateIdByRelation } from "../../../validation/validateId/validateId.js";
import { Colaborador } from "../../entities/class/colaborador.js";
import * as DB from "../../../repositories/queryTools.js"

export let createColaborador = async (
  user: { name: string; email: string; senha: string; setor: string },
  id_empresa: string
) => {
  console.log("🚀 Validando id da empresa");

  // Valida se a empresa existe
  let result = await validateIdByRelation(id_empresa, "tb_empresa", "id");
  if (result === false) {
    throw new Error(`Empresa ${id_empresa} nao encontrada`);
  }

  console.log("Iniciando criação do colaborador pela classe Colaborador");
  let colaborador = new Colaborador(
    user.name,
    user.email,
    user.senha,
    user.setor
  );

  try {
    console.log("Definindo ID único para colaborador");
    colaborador.setId();

    // Garante que o ID não seja vazio
    while (colaborador.id == "") {
      console.log("ID vazio detectado, gerando novo ID");
      await colaborador.setId();
    }

    // Inserção no banco de dados
    console.log(
      `Inserindo colaborador com ID: ${colaborador.id} no banco de dados`
    );
    await DB.insertIntoColaborador(
      colaborador.id,
      colaborador.name,
      colaborador.email,
      colaborador.senha,
      colaborador.setor
    );

    // Associa colaborador à empresa
    console.log(
      `Associando colaborador ID: ${colaborador.id} à empresa ID: ${id_empresa}`
    );
    await DB.updateColaboradorEmpresa(colaborador.id, id_empresa);
    await DB.insertEmpresaColaborador(colaborador.id, id_empresa);

    console.log("✅ Colaborador criado e associado com sucesso!");
    return true;
  } catch (error) {
    console.error("❌ Erro ao criar colaborador:", error);
    return false;
  }
};

/**
 * Busca um colaborador específico.
 */
export let getColaborador = async (table: string, id: string): Promise<any> => {
  const logPrefix = `[getColaborador][Table: ${table}][ID: ${id}]`;
  try {
    console.info(`${logPrefix} - Iniciando consulta do colaborador`);
    let result = await DB.selectFromIdWhere(table, id);
    console.info(
      `${logPrefix} - Consulta finalizada, registros encontrados: ${result.rows.length}`
    );
    return result;
  } catch (error) {
    console.error(`${logPrefix} - ERRO ao consultar colaborador:`, error);
    throw error;
  }
};