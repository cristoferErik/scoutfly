import { fetchAllClients } from "../../api/endpoints.js";
import { ClientResponse, pageLinks } from "../interfaces/ClientInt.js";
import { Client } from "../models/Client.js";

export class ClientService{
    public clients: Client[]=[];
    public pageLinks?:pageLinks;
    
    async getAllClients(parameters:string|null):Promise<Client[]>{
        const fetchClients = await fetchAllClients(parameters);
        if (fetchClients) {
            this.clients=[...fetchClients.body];
            this.pageLinks={...fetchClients.pageLinks};
        } else {
            console.log('Error al cargar los usuarios.');
        }
        return this.clients;
    }
}