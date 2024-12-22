import { ClientUI } from "../ui/ClientUI.js";

export class Index{
    constructor(){
        let clientUI=new ClientUI();
        clientUI.renderClients();
    }
}
new Index();