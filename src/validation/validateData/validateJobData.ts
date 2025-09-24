/**
 * Valida se a data informada é futura em relação à data atual.
 * 
 * Compara a data fornecida com a data corrente do sistema.
 * 
 * @param date - Data a ser validada.
 * @returns boolean - true se a data for maior que a data atual (futura), false caso contrário.
 */
export let validateDate = (date: Date): boolean => {
  const currentDate = new Date();
  return date > currentDate;
};
