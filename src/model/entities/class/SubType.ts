/**
 * =========================================
 * Classe: SubTipo
 * =========================================
 * Representa um subtipo de deficiência, associado a um tipo específico.
 * Cada instância possui um ID único, descrição, tipo e data de criação.
 */
export class SubTipo {
  public id: string;         // ID único do subtipo
  public descricao: string;  // Descrição do subtipo
  public tipo: string;       // Tipo ao qual o subtipo pertence
  public created_at: Date;   // Data de criação

  /**
   * Construtor da classe SubTipo
   * @param descricao - Nome ou descrição do subtipo
   * @param tipo - Tipo de deficiência associado
   * @param created_at - Data de criação
   */
  constructor(descricao: string, tipo: string, created_at: Date) {
    this.id = "";  // ID será gerado via setId()
    this.descricao = descricao;
    this.tipo = tipo;
    this.created_at = created_at;
  }

  /**
   * setId
   * Gera um ID único combinando prefixo "SUBT-" com número aleatório (0-9999)
   * Observação: Para ambientes de produção, UUID é mais seguro para evitar colisões.
   */
  public setId() {
    const prefix = "SUBT-";
    const suffix = Math.floor(Math.random() * 10000);
    this.id = prefix + suffix.toString();
  }

  /**
   * toString
   * Retorna uma string representativa do objeto SubTipo, útil para logs e depuração.
   */
  public toString() {
    return `SUBTIPO: ${this.id} - ${this.descricao} - ${this.created_at.toISOString()}\n`;
  }
}
