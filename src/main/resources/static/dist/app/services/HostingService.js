var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAllHostingsByClient, fetchDeleteHosting, fetchSaveHosting } from "../../api/endpoints.js";
export class HostingService {
    constructor() {
        this.hostings = [];
    }
    getAllHostingsByClient(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            const fetchHostings = yield fetchAllHostingsByClient(clientId);
            if (fetchHostings) {
                this.hostings = [...fetchHostings];
                //console.log(this.clients);
            }
            else {
                console.log('Error al cargar los usuarios.');
            }
            return this.hostings;
        });
    }
    saveHostingService(hosting) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = "";
            const fetchHosting = yield fetchSaveHosting(hosting);
            if (fetchHosting) {
                message = fetchHosting.message;
            }
            return message;
        });
    }
    deleteHostingService(hostingId) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = "";
            const fetchHosting = yield fetchDeleteHosting(hostingId);
            if (fetchHosting) {
                message = fetchHosting.message;
            }
            return message;
        });
    }
}
