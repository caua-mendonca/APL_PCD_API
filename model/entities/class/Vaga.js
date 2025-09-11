/**
 * Classe que representa uma vaga de emprego no sistema.
 */
export class Vaga {
    /**
     * Construtor para inicializar uma nova vaga com os dados básicos.
     * @param data_fim - Data final (validade) da vaga
     * @param titulo - Título da vaga
     * @param descricao - Descrição detalhada da vaga
     * @param salario - Salário oferecido
     * @param localidade - Localidade da vaga
     * @param acessibilidade - Detalhes de acessibilidade da vaga
     */
    constructor(data_fim, titulo, descricao, salario, localidade, acessibilidade) {
        this.id = ""; // Inicialmente vazio, será definido via setId()
        this.data_inicio = new Date(); // Define data de criação da vaga como momento atual
        this.data_fim = data_fim;
        this.status = true; // Vaga começa ativa por padrão
        this.titulo = titulo;
        this.descricao = descricao;
        this.salario = salario;
        this.localidade = localidade;
        this.acessibilidade = acessibilidade;
    }
    /**
     * Define o ID da vaga com prefixo fixo "VAGA-" seguido de número aleatório.
     * @param id - Parâmetro não utilizado, poderia ser removido para evitar confusão
     */
    setId(id) {
        let prefix = "VAGA-";
        let sufix = Math.floor(Math.random() * 1000000);
        this.id = prefix + sufix;
    }
}
