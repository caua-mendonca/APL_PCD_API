import * as IFBR from "../../model/createIFBR/createIFBR.js";

export let controllerIFBR = async (
  ID: string,
  body: [{ id: number; name: string; score: number }]
): Promise<any> => {
  try {
    if (ID === "1") {
      let ressult = IFBR.createIFBRCompleto(body);
      await ressult === true? true : false;
    } else if (ID === "2") {
      let ressult = IFBR.createIFBRReduzido(body);
      await ressult === true? true : false;
    } else {
      throw new Error("ID inválido");
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
