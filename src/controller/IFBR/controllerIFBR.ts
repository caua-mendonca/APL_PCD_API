import * as IFBR from "../../model/createIFBR/createIFBR.js";

export let controllerIFBR = async (
  ID: string,
  body: [{ id: number; name: string; score: number }]
): Promise<any> => {
  try {
    if (ID === "1") {
      console.log("Passando ao createIFBR()");
      let ressult = IFBR.createIFBRCompleto(body);
      if ((await ressult) === true) {
        return true;
      }
    } else if (ID === "2") {
      console.log("Passando ao createIFBR()");
      let ressult = IFBR.createIFBRReduzido(body);
      if ((await ressult) === true) {
        return true;
      }
    } else {
      throw new Error("ID inválido");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
