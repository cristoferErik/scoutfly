var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllClients, fetchSaveClient } from "../../api/endpoints.js";
export class ClientService {
    constructor() {
        this.clients = [];
    }
    getAllClients(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchClients = yield fetchAllClients(parameters);
            if (fetchClients) {
                this.clients = [...fetchClients.body];
                this.pageLinks = Object.assign({}, fetchClients.pageLinks);
            }
            else {
                console.log('Error al cargar los usuarios.');
            }
            return this.clients;
        });
    }
    fetchSaveClientService(client) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = "";
            const fetchClient = yield fetchSaveClient(client);
            if (fetchClient) {
                message = fetchClient.message;
            }
            return message;
        });
    }
}
