import * as Model from "../../model/user/company/companyModel.js";

/**
 * Controller responsável por criar um novo contratante.
 * Chama a função createContratante para validação e inserção no banco.
 * @param user - Dados do contratante a ser criado
 * @returns resposta do createContratante (sucesso, erros ou exceção)
 */
export const createCompanyController = async (user: {
  trade_name: string;
  company_name: string;
  email: string;
  confirm_email: string;
  password: string;
  confirm_password: string;
  cnpj: string;
  phone: string;
  accessibility: string;
}) => {
  console.log("[POST / CONTROLLER Company]");

  try {
    const mappedUser = {
      nome_fantasia: user.trade_name,
      razao_social: user.company_name,
      email: user.email,
      confirme_email: user.confirm_email,
      senha: user.password,
      confirme_senha: user.confirm_password,
      cnpj: user.cnpj,
      telefone: user.phone,
      acessibilidade: user.accessibility,
    };
    const [status, message] = await Model.createCompany(mappedUser);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para buscar todos os contratantes no banco.
 * @returns lista de contratantes encontrados
 */
export const getCompaniesController = async (): Promise<
  [number, string[] | string]
> => {
  console.log("[GET / CONTROLLER Company]");

  try {
    const [status, message] = await Model.getUser("tb_empresa");
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para buscar um contratante pelo seu ID.
 * @param id - ID do contratante
 * @returns objeto contratante ou mensagem de não encontrado
 */
export const getCompanyByIdController = async (id: string) => {
  console.log("[GET / CONTROLLER Company]");

  try {
    const [status, result] = await Model.getUserByID("tb_empresa", id);
    return [status, result];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para deletar um contratante pelo seu ID.
 * @param id - ID do contratante a ser deletado
 * @returns true se deletado, false caso contrário
 */
export const deleteCompanyController = async (id: string): Promise<any> => {
  console.log("[DELETE / CONTROLLER Company]");

  try {
    const [status, message] = await Model.deleteUser("tb_empresa", id);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};

/**
 * Controller para atualizar os dados de um contratante.
 * @param id - ID do contratante
 * @param body - Objeto com os dados a serem atualizados
 * @returns resultado da atualização ou false em caso de falha
 */
export const updateCompanyController = async (id: string, body: object): Promise<any> => {
  console.log("[PUT / CONTROLLER Company]");

  try {
    const [status, message] = await Model.updateUser("tb_empresa", id, body);
    return [status, message];
  } catch (error) {
    return [400, String(error)];
  }
};
