import * as Db from "../../repository/insertDB/queryTools.js";

export let validateId = async (id: string) => {
    let validId = await Db.selectId("tb_candidato", id);
    console.log(validId)
}

export let validateIdContratante = async (id: string):Promise<boolean> => {
   let arr: string[] = id.toUpperCase().split("-");
   return arr[0] == "EMP" || arr[0] == "COLAB" ? true :false;
}