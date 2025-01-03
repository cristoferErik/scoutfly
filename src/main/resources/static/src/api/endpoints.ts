import { ActivityResponse, ClientResponse } from "../app/interfaces/ClientInt";
import { ResponseMessage } from "../app/interfaces/Response";
import { Activity } from "../app/models/Activity";
import { Client } from "../app/models/Client";

export const API_BASE_URL = '/scoutfly/api';

export const GET_CLIENTS = API_BASE_URL + '/clients';
export const POST_CLIENT = API_BASE_URL + '/client';
export const GET_HOSTINGS_BY_CLIENT = API_BASE_URL + '/hostings';
export const GET_WEBSITES_BY_HOSTING = API_BASE_URL + '/websites';
export const GET_ACTIVITIES = API_BASE_URL + '/activities';
export const GET_ACTIVITIES_CLIENT=API_BASE_URL + '/activities-client';
/*Client Risorsa */
//Con questo ottengo i dati che vengo del backend
export async function fetchAllClients(parameters: string | null): Promise<ClientResponse | null> {
    let clientResponse: ClientResponse | null = null;
    try {
        if (!parameters) {
            parameters = GET_CLIENTS;
        }
        const response = await fetch(parameters, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        }
        const responseData = await response.json();
        clientResponse = responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return clientResponse;
}
export async function fetchSaveClient(client:Client):Promise<ResponseMessage>{
    try {
        const response = await fetch(POST_CLIENT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(client),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al salvare il cliente');
        }

        return await response.json();  // Devuelve la respuesta completa
    } catch (error) {
        console.error('Error en fetchSaveClient:', error);
        throw error;
    }
}
/*Hosting*/
export async function fetchAllHostingsByClient<T>(clientId: number): Promise<T | null> {
    let data: T | null = null;
    try {
        const response = await fetch(`${GET_HOSTINGS_BY_CLIENT}?clientId=${clientId}`, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        }
        const responseData = await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}
/*WebSites risorsa */
export async function fetchAllWebSiteByHosting<T>(hostingId: number): Promise<T | null> {
    let data: T | null = null;
    try {
        const response = await fetch(`${GET_WEBSITES_BY_HOSTING}/${hostingId}`, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        }
        const responseData = await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}
/*Activities  risorsa*/
export async function fetchAllActivitiesByClient(clientId: number, parameters: string | null): Promise<ActivityResponse | null> {
    let activityResponse: ActivityResponse | null = null;
    let url = `${GET_ACTIVITIES}/${clientId}`;
    try {
        if (parameters) {
            url = parameters;
        }

        const response = await fetch(url, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        }
        const responseData = await response.json();
        activityResponse = responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return activityResponse;
}
export async function fetchAllActivities(parameters: string | null) {
    let activityResponse: ActivityResponse | null = null;
    let url = `${GET_ACTIVITIES_CLIENT}`;
    try {
        if (parameters) {
            url = parameters;
        }
        const response = await fetch(url, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        }
        const responseData = await response.json();
        activityResponse = responseData;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return activityResponse;
}