import { fetchAllHostingsByClient, fetchDeleteHosting, fetchSaveHosting } from "../../api/endpoints.js";
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
    
    async saveHostingService(hosting:Hosting):Promise<string>{
        let message:string="";
        const fetchHosting= await fetchSaveHosting(hosting);
        if(fetchHosting){
            message=fetchHosting.message;
        }
        return message;
    }
    async deleteHostingService(hostingId:number):Promise<string>{
        let message:string="";
        const fetchHosting=await fetchDeleteHosting(hostingId);
        if(fetchHosting){
            message=fetchHosting.message;
        }
        return message;
    }
}