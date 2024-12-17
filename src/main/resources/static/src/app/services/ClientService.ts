import { fetchAllClients } from "../../api/endpoints.js";
import { Client } from "../models/Client.js";

export class ClientService{
    private clients: Client[]=[];
    
    async getAllClients():Promise<Client[]>{
        const fetchClients = await fetchAllClients<Client[]>();
        if (fetchClients) {
            this.clients=[...fetchClients];
        } else {
            console.log('Error al cargar los usuarios.');
        }
        return this.clients;
    }
}