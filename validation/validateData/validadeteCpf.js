import * as DB from "../../repositories/queryTools.js";
/**
 * Valida um CPF conforme as regras oficiais da Receita Federal.
 *
 * Remove caracteres não numéricos, verifica tamanho e sequências repetidas,
 * e calcula os dígitos verificadores para autenticar o CPF.
 *
 * @param cpf - String contendo o CPF a ser validado.
 * @returns Boolean indicando se o CPF é válido (true) ou inválido (false).
 */
export let validateCpf = (cpf) => {
    // Remove tudo que não for dígito
    cpf = cpf.replace(/[^\d]/g, "");
    // Valida tamanho e sequência de números iguais
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf))
        return false;
    let validate = cpf.split("").map(Number);
    let validateChar1 = 0;
    let validateChar2 = 0;
    // Calcula primeiro dígito verificador
    for (let i = 0; i < 9; i++) {
        validateChar1 += (10 - i) * validate[i];
        validateChar2 += (11 - i) * validate[i];
    }
    validateChar1 = (validateChar1 * 10) % 11;
    if (validateChar1 === 10)
        validateChar1 = 0;
    // Calcula segundo dígito verificador
    validateChar2 = ((validateChar2 + validateChar1 * 2) * 10) % 11;
    if (validateChar2 === 10)
        validateChar2 = 0;
    // Retorna true se os dígitos verificadores conferem, false caso contrário
    return validate[9] === validateChar1 && validate[10] === validateChar2;
};
/**
 * Verifica no banco de dados se um determinado valor existe numa coluna específica de uma tabela.
 * Utilizado para validar, por exemplo, se um CPF já está cadastrado.
 *
 * @param value - Valor a ser verificado no banco (ex: CPF).
 * @param data - Nome da coluna na tabela onde será feita a busca.
 * @param table - Nome da tabela onde será feita a consulta.
 * @returns Promise<boolean> - true se o valor NÃO existe (válido para cadastro), false caso contrário.
 */
export let validateCpfToDB = async (value, data, table) => {
    // Consulta no banco a quantidade de registros com o valor informado
    let result = Number(await DB.validateData(value, data, table));
    // Se resultado > 0, valor já existe => retorna false (não válido para novo cadastro)
    // Caso contrário, retorna true
    result > 0 ? (result = false) : (result = true);
    return result;
};
