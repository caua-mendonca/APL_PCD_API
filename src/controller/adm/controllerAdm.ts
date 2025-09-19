import * as Model from "../../model/adm/modelAdm.js"

export let createBarreira = async (body:any):Promise<any> =>{
    console.log("[POST / CONTROLLER ADM]")

    try {
        let[status, message] = await Model.createBarreira(body)
        return [status, message]
    } catch (error) {
        return [500, String(error)]   
    }
}
export let createAcess = async (body:any):Promise<any> =>{
    console.log("[POST / CONTROLLER ADM]")

    try {
        let[status, message] = await Model.createAcess(body)
        return [status, message]
    } catch (error) {
        return [500, String(error)]   
    }
}
export let createSubTipo = async (body:any):Promise<any> =>{
    console.log("[POST / CONTROLLER ADM]")

    try {
        let[status, message] = await Model.createSubTipo(body)
        return [status, message]
    } catch (error) {
        return [500, String(error)]   
    }
}