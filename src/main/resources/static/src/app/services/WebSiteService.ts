import { fetchAllWebSiteByHosting, fetchSaveWebSite } from "../../api/endpoints.js";
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
        async saveWebSite(webSite:WebSite):Promise<string>{
            let message="";
            const fetchWebSite = await fetchSaveWebSite(webSite);
            if(fetchWebSite){
                message=fetchWebSite.message;
            }
            return message;
        }
}