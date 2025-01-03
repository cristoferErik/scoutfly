import { EmailModule } from "../modules/EmailModule.js";
import { ClientUI } from "../ui/ClientUI.js";
import { addSelectRowOfTable } from "../utils/Tools.js";

export class Index{
    constructor(){
        let clientUI=new ClientUI();
        clientUI.renderClients();

        let emailModule=new EmailModule();
        emailModule.renderEmailUI();
    }
}
new Index();
