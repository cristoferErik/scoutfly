var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const API_BASE_URL = '/scoutfly/api';
export const GET_USERS = API_BASE_URL + '/clients';
export function fetchAllClients() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(GET_USERS, {
                method: 'GET', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json', // Cabecera
                },
            });
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                console.error('HTTP Error:', response.statusText);
                return null;
            }
            // Parsear la respuesta como JSON
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Fetch Error:', error);
            return null;
        }
    });
}
