import * as IFBR from "../../model/createIFBR/createIFBR.js";

export let controllerIFBR = async (
  ID: string,
  body: [{ id: number; name: string; score: number }]
): Promise<Boolean> => {
  try {
    if (ID === "1") {
      let ressult = IFBR.createIFBRCompleto(body);
      if (await ressult === true) {
        return true;
      }else{
        let result = IFBR.createIFBRReduzido(body);
        if (await result === true) {
          return true;
        }else{
          throw new Error("Erro ao criar IFBR");
        }
      }
    } else if (ID === "2") {
      return true;
    } else {
      throw new Error("ID inválido");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
