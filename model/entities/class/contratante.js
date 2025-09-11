/**
 * Classe que representa um Contratante (empresa) no sistema,
 * contendo dados essenciais para identificação e autenticação.
 */
export class Contratante {
    /**
     * Inicializa uma nova instância da classe Contratante com os dados fornecidos.
     * @param name_fantasia - Nome fantasia da empresa
     * @param rasao_social - Razão social da empresa
     * @param email - Email do contratante
     * @param confirme_email - Confirmação do email
     * @param senha - Senha de acesso
     * @param confirme_senha - Confirmação da senha
     * @param cnpj - CNPJ da empresa
     * @param telefone - Telefone para contato
     * @param acessibilidade - Informações de acessibilidade da empresa
     */
    constructor(name_fantasia, rasao_social, email, confirme_email, senha, confirme_senha, cnpj, telefone, acessibilidade) {
        this.id = ""; // ID único do contratante, gerado dinamicamente
        this.status = true; // Status ativo do contratante
        this.nome_fantasia = name_fantasia;
        this.razao_social = rasao_social;
        this.email = email;
        this.confirme_email = confirme_email;
        this.senha = senha;
        this.confirme_senha = confirme_senha;
        this.cnpj = cnpj;
        this.telefone = telefone;
        this.acessibilidade = acessibilidade;
    }
    /**
     * Gera e atribui um ID único para o contratante,
     * com prefixo "EMP-" seguido de um número aleatório de 6 dígitos.
     */
    async setId() {
        let prefix = "EMP-";
        let suffix = Math.floor(Math.random() * 1000000);
        this.id = prefix + suffix;
    }
    async SetCryptPass(newPass) {
        this.senha = newPass;
    }
}
