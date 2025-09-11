/**
 * Valida se uma pessoa é maior de idade (18 anos) a partir da data de nascimento fornecida.
 *
 * Compara o ano atual com o ano de nascimento, ajustando para considerar se já fez aniversário neste ano.
 *
 * @param data_nascimento - Data de nascimento do candidato.
 * @returns boolean - true se maior ou igual a 18 anos, false caso contrário.
 */
export let validateAge = (data_nascimento) => {
    let dateCandidate = new Date(data_nascimento);
    const hoje = new Date();
    // Calcula a idade inicial pela diferença de anos
    let idade = hoje.getFullYear() - dateCandidate.getFullYear();
    // Captura mês e dia atuais e da data de nascimento para ajuste fino
    const mesAtual = hoje.getMonth();
    const diaAtual = hoje.getDate();
    const mesNascimento = dateCandidate.getMonth();
    const diaNascimento = dateCandidate.getDate();
    // Ajusta idade se ainda não fez aniversário neste ano
    if (mesAtual < mesNascimento ||
        (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
        idade--;
    }
    // Retorna true se idade for maior ou igual a 18
    return idade >= 18;
};
