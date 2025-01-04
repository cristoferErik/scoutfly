import {
    fetchAllWebSiteByHosting,
    fetchSaveWebSite,
} from "../../api/endpoints.js";
import { pageLinks } from "../interfaces/ClientInt.js";
import { WebSite } from "../models/WebSite.js";

export class WebSiteService {
    public websites: WebSite[] = [];
    public pageLinks?: pageLinks;

    async getAllWebSitesByHosting(
        clientId: number,
        parameters: string | null
    ): Promise<WebSite[]> {
        const fetchHostings = await fetchAllWebSiteByHosting(
            clientId,
            parameters
        );
        if (fetchHostings) {
            this.websites = [...fetchHostings.body];
            this.pageLinks={...fetchHostings.pageLinks};
            //console.log(this.clients);
        } else {
            console.log("Error al cargar los usuarios.");
        }
        return this.websites;
    }
    async saveWebSite(webSite: WebSite): Promise<string> {
        let message = "";
        const fetchWebSite = await fetchSaveWebSite(webSite);
        if (fetchWebSite) {
            message = fetchWebSite.message;
        }
        return message;
    }
}
