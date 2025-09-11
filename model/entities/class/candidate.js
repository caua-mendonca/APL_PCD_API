/**
 * Classe que representa um Candidato no sistema,
 * encapsulando seus dados pessoais e funcionalidades relacionadas.
 */
export class Candidate {
    /**
     * Inicializa uma nova instância da classe Candidate com os dados fornecidos.
     * @param name - Nome completo do candidato
     * @param email - Email do candidato
     * @param confirme_email - Confirmação do email
     * @param senha - Senha de acesso
     * @param confirme_senha - Confirmação da senha
     * @param telefone - Telefone de contato
     * @param cpf - CPF do candidato
     * @param data_nascimento - Data de nascimento
     * @param def_motora - Deficiência motora
     * @param def_auditiva - Deficiência auditiva
     * @param def_visual - Deficiência visual
     * @param sub_tipo - Subtipo de deficiência
     */
    constructor(name, email, confirme_email, senha, confirme_senha, telefone, cpf, data_nascimento, def_motora, def_auditiva, def_visual, sub_tipo, barreira, acessbilidade) {
        this.status = true;
        this.id = ""; // ID será gerado posteriormente
        this.name = name;
        this.email = email;
        this.confirme_email = confirme_email;
        this.senha = senha;
        this.confirme_senha = confirme_senha;
        this.telefone = telefone;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.def = ""; // Deficiência será gerada posteriormente
        this.def_visual = def_visual;
        this.def_auditiva = def_auditiva;
        this.def_motora = def_motora;
        this.sub_tipo = sub_tipo;
        this.barreira = barreira;
        this.acessbilidade = acessbilidade;
        if (def_auditiva === true) {
            this.setDef("DAUDI-");
        }
        else if (def_motora === true) {
            this.setDef("DMOTO-");
        }
        else if (def_visual === true) {
            this.setDef("DVISU-");
        }
        else {
            this.setDef("");
        }
        this.setId();
    }
    /**
     * Gera e atribui um ID único para o candidato,
     * com prefixo "CAND-" seguido de número aleatório de 6 dígitos.
     */
    async setId() {
        let prefix = "CAND-";
        let suffix = Math.floor(Math.random() * 1000000);
        this.id = prefix + suffix;
    }
    async setDef(prefix) {
        let suffix = Math.floor(Math.random() * 1000000);
        this.def = prefix + suffix;
    }
    async SetCryptPass(newPass) {
        this.senha = newPass;
    }
}
