import * as DB from "../../repository/insertDB/queryTools.js"
import { validateCpf } from "../validateData/validadeteCpf.js";
import { validateAge } from "../validateData/validateAge.js";

export let updateUser = async (table: string, id: number, body: object) => {
  console.log("Passando ao updateUser()");

  // Monta os pares coluna = $i
  const keys = Object.keys(body);
  const values = Object.values(body);
  const sets = keys.map((key, index) => `${key} = $${index + 1}`).join(", ");

  // Validações específicas
  if (keys.includes("cpf")) {
    const index = keys.indexOf("cpf");
    const cpfIsValid: boolean = validateCpf(values[index]);
    if (!cpfIsValid) throw new Error("CPF inválido");
  }

  if (keys.includes("data_nascimento")) {
    const index = keys.indexOf("data_nascimento");
    const dateIsValid: boolean = validateAge(new Date(values[index]));
    if (!dateIsValid) throw new Error("Data de nascimento inválida");
  }

  // Chamada segura da função de atualização
  return await DB.updateUserColumn(table, id, sets, values);
};

