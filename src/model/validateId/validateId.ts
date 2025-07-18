import * as Db from "../../repository/insertDB/queryTools.js";

export let validateId = async (id: string) => {
    let validId = await Db.selectId("tb_candidato", id);
    console.log(validId)
}