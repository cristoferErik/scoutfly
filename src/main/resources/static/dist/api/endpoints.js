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
export const GET_HOSTINGS_BY_CLIENT = API_BASE_URL + '/hostings';
export const GET_WEBSITES_BY_HOSTING = API_BASE_URL + '/websites';
export const GET_ACTIVITIES_BY_WEBSITE = API_BASE_URL + '/activities';
//Con questo ottengo i dati che vengo del backend
export function fetchAllClients(parameters) {
    return __awaiter(this, void 0, void 0, function* () {
        let clientResponse = null;
        try {
            if (!parameters) {
                parameters = GET_USERS;
            }
            const response = yield fetch(parameters, {
                method: 'GET', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json', // Cabecera
                },
            });
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.statusText);
            }
            const responseData = yield response.json();
            clientResponse = responseData;
        }
        catch (error) {
            console.error('Fetch Error:', error);
        }
        return clientResponse;
    });
}
export function fetchAllHostingsByClient(clientId) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = null;
        try {
            const response = yield fetch(`${GET_HOSTINGS_BY_CLIENT}?clientId=${clientId}`, {
                method: 'GET', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json', // Cabecera
                },
            });
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.statusText);
            }
            const responseData = yield response.json();
            data = responseData.body;
        }
        catch (error) {
            console.error('Fetch Error:', error);
        }
        return data;
    });
}
export function fetchAllWebSiteByHosting(hostingId) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = null;
        try {
            const response = yield fetch(`${GET_WEBSITES_BY_HOSTING}?hostingId=${hostingId}`, {
                method: 'GET', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json', // Cabecera
                },
            });
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.statusText);
            }
            const responseData = yield response.json();
            data = responseData.body;
        }
        catch (error) {
            console.error('Fetch Error:', error);
        }
        return data;
    });
}
export function fetchAllActivitiesByWebSite(webSiteId, activityFilters) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = null;
        try {
            const response = yield fetch(`${GET_ACTIVITIES_BY_WEBSITE}/${webSiteId}`, {
                method: 'POST', // Método de la solicitud
                headers: {
                    'Content-Type': 'application/json', // Cabecera
                },
                body: JSON.stringify(activityFilters),
            });
            // Verificar si la respuesta es exitosa (status 200-299)
            if (!response.ok) {
                throw new Error('HTTP Error: ' + response.statusText);
            }
            const responseData = yield response.json();
            data = responseData.body;
        }
        catch (error) {
            console.error('Fetch Error:', error);
        }
        return data;
    });
}
