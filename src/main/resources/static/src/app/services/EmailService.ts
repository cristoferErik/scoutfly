import { fetchSendEmail } from "../../api/endpoints.js";
import { Email } from "../models/Email.js";

export class EmailService{
    async sendMessage(email:Email):Promise<String>{
        let message:string="";
        const fetchEmail= await fetchSendEmail(email);
        if(fetchEmail){
            message=fetchEmail.message;
        }
        return message;
    }
}