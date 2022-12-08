import { message } from "antd";

export const Toaster = {
    Success:(mess:string)=>{
        message.success(mess);
    },
    Error:(mess:string)=>{
        message.error(mess);
    },
    Warning:(mess:string)=>{
        message.warning(mess);
    },
}