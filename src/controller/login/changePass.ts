import * as Model from "../../model/user/login/changePass.js"

export let changePassword = async (body:any, id:string):Promise<any> => {
    console.log(`[POST / CONTROLLER changePassword]`);
    try {
        let [status, message] = await Model.changePassword(body, id);
        return [status, message];
    } catch (error) {
        return [400, String(error)];
    }
}