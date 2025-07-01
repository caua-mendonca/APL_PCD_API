import { createColaborador } from "../../model/colaborador/createColaborador.js";

export let controllerColaborador = async (user: {
  name: string;
  email: string;
  senha: string;
  setor: string;
}) => {
  let response = createColaborador(user);

  return response
};
