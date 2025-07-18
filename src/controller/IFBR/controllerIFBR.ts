import * as IFBR from "../../model/createIFBR/createIFBR.js";

export let controllerIFBR = async (
  ID: string,
  body: [{ id: number; name: string; score: number }]
): Promise<any> => {
  let result = IFBR.createIFBRCompleto(body, ID);

  return result
};
