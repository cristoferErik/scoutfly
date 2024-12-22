import { fetchAllWebSiteByHosting } from "../../api/endpoints.js";
import { WebSite } from "../models/WebSite.js";

export class WebSiteService{
    public websites: WebSite[]=[];
        async getAllWebSitesByHosting(clientId:number):Promise<WebSite[]>{
                const fetchHostings = await fetchAllWebSiteByHosting<WebSite[]>(clientId);
                if (fetchHostings) {
                    this.websites=[...fetchHostings];
                    //console.log(this.clients);
                } else {
                    console.log('Error al cargar los usuarios.');
                }
                return this.websites;
            }
}