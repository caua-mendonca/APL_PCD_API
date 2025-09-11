/**
 * Remove caracteres especiais de um telefone formatado e retorna apenas os dígitos numéricos.
 *
 * Remove parênteses e traços para normalizar o número.
 *
 * @param tel - String contendo o telefone formatado.
 * @returns number - Telefone limpo convertido para número.
 */
export let validateTel = (tel) => {
    // Remove todos os traços "-"
    tel = tel
        .split("")
        .filter((char) => char !== "-")
        .join("");
    // Remove parênteses "(" e ")"
    tel = tel
        .split("")
        .filter((char) => char !== "(")
        .join("");
    tel = tel
        .split("")
        .filter((char) => char !== ")")
        .join("");
    // Retorna telefone limpo como número
    return Number(tel);
};
