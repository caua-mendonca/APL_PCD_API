import { createColaborador } from "../../model/colaborador/createColaborador.js";

export let controllerColaborador = async (user: {
  name: string;
  email: string;
  senha: string;
  setor: string;
}) => {
  let response = createColaborador(
user
  );
  try {
    if (await response) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};
