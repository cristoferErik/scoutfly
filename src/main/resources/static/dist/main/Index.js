import { EmailModule } from "../modules/EmailModule.js";
import { ClientUI } from "../ui/ClientUI.js";
export class Index {
    constructor() {
        let clientUI = new ClientUI();
        clientUI.renderClients(null);
        let emailModule = new EmailModule();
        emailModule.renderEmailUI();
    }
}
new Index();
