var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllWebSiteByHosting } from "../../api/endpoints.js";
export class WebSiteService {
    constructor() {
        this.websites = [];
    }
    getAllWebSitesByHosting(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchHostings = yield fetchAllWebSiteByHosting(clientId);
            if (fetchHostings) {
                this.websites = [...fetchHostings];
                //console.log(this.clients);
            }
            else {
                console.log('Error al cargar los usuarios.');
            }
            return this.websites;
        });
    }
}