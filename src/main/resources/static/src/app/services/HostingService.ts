import { fetchAllHostingsByClient } from "../../api/endpoints.js";
import { Hosting } from "../models/Hosting.js";

export class HostingService{
    public hostings: Hosting[]=[];
    async getAllHostingsByClient(clientId:number):Promise<Hosting[]>{
            const fetchHostings = await fetchAllHostingsByClient<Hosting[]>(clientId);
            if (fetchHostings) {
                this.hostings=[...fetchHostings];
                //console.log(this.clients);
            } else {
                console.log('Error al cargar los usuarios.');
            }
            return this.hostings;
        }
}