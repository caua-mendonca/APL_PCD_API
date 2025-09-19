/**
 * =========================================
 * Classe: Acessibilidade
 * =========================================
 * Representa um registro de acessibilidade no sistema.
 * Responsável por armazenar dados essenciais e gerar ID único.
 */

export class Acessibilidade {
    public id: string;          // ID único do registro (gerado dinamicamente)
    public descricao: string;   // Descrição textual da acessibilidade
    public created_at: Date;    // Timestamp de criação do registro

    /**
     * Construtor da classe
     * @param descricao - Descrição da acessibilidade
     * @param created_at - Data de criação do registro
     */
    constructor(descricao: string, created_at: Date) {
        this.id = "";           // Inicializa o ID vazio; será gerado via setId()
        this.descricao = descricao;
        this.created_at = created_at;
    }

    /**
     * setId
     * Gera um ID único combinando prefixo "ACES-" com número aleatório (0-9999)
     * Observação: Para produção, considerar UUID para evitar colisões.
     */
    public setId() {
        const prefix: string = "ACES-";
        const suffix: number = Math.floor(Math.random() * 10000);
        this.id = prefix + suffix.toString();
    }

    /**
     * toString
     * Retorna uma representação textual da instância, útil para logs e debug.
     */
    public toString() {
        return `ACESSIBILIDADE: ${this.id} - ${this.descricao} - ${this.created_at.toISOString()}\n`;
    }
}
