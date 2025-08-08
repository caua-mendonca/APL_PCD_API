import * as Db from "../../repositories/queryTools.js";

/**
 * Valida a existência de um ID em uma tabela específica.
 * 
 * @param id - ID que será validado.
 * @param table - Nome da tabela onde o ID será buscado.
 * @returns void (apenas imprime no console o resultado da validação).
 */
export let validateId = async (id: string, table: string): Promise<any> => {
  // Log inicial para rastrear a execução da validação.
  console.log(`🚀 Iniciando validação de ID ${id} na tabela ${table}`);
  
  // Consulta ao banco para verificar a existência do ID na tabela informada.
  let validId = await Db.selectId(table, id);
  
  // Exibe o resultado da validação no console.
  console.log("✔️ Resultado da validação:", validId);
  return validId;
};

/**
 * Valida se o ID informado pertence a um Contratante (EMP) ou a um Colaborador (COLAB).
 * 
 * @param id - ID a ser validado (formato esperado: EMP-XXXX ou COLAB-XXXX).
 * @returns Retorna true se o ID começa com EMP ou COLAB; false caso contrário.
 */
export let validateIdContratante = async (id: string): Promise<boolean> => {
  console.log(`🚀 Validando se ID é Contratante ou Colaborador: ${id}`);
  
  // Quebra o ID no separador "-" para analisar o prefixo.
  let arr: string[] = id.toUpperCase().split("-");
  
  // Verifica se o prefixo é válido (EMP ou COLAB).
  let isValid: boolean;
  arr[0] === "EMP" || arr[0] === "COLAB" ? (isValid = true) : (isValid = false);
  
  // Log do resultado final.
  console.log(`✔️ Resultado da validação: ${isValid}`);
  return isValid;
};

/**
 * Valida se o ID informado pertence a um Candidato (CAND).
 * 
 * @param id - ID a ser validado (formato esperado: CAND-XXXX).
 * @returns Retorna true se o ID começa com CAND; false caso contrário.
 */
export let validateIdCandidato = async (id: string): Promise<boolean> => {
  console.log(`🚀 Validando se ID é Candidato: ${id}`);
  
  // Quebra o ID no separador "-" para analisar o prefixo.
  let arr: string[] = id.toUpperCase().split("-");
  
  // Verifica se o prefixo é CAND.
  let isValid = arr[0] === "CAND";
  
  // Log do resultado final.
  console.log(`✔️ Resultado da validação: ${isValid}`);
  return isValid;
};

/**
 * Valida a existência de um valor específico relacionado a um campo em determinada tabela.
 * 
 * @param value - Valor que será validado.
 * @param data - Coluna onde será feita a busca.
 * @param table - Nome da tabela onde será realizada a validação.
 * @returns Retorna true se o valor existir na tabela; false caso contrário.
 */
export let validateIdByRelation = async (
  value: string,
  data: string,
  table: string
): Promise<boolean> => {
  console.log(`🚀 Validando se o valor '${value}' existe na tabela ${table}`);
  
  // Consulta ao banco para validar se o valor existe na relação especificada.
  let result = await Db.validateData(value, table, data);
  
  // Retorna true se encontrou registros, false se não encontrou.
  if (result > 0) {
    return true;
  } else {
    return false;
  }
};
