import { ActivityResponse, ClientResponse } from "../app/interfaces/ClientInt";
import { Activity } from "../app/models/Activity";
import { Client } from "../app/models/Client";

export const API_BASE_URL = '/scoutfly/api';

export const GET_CLIENTS = API_BASE_URL + '/clients';
export const GET_HOSTINGS_BY_CLIENT = API_BASE_URL + '/hostings';
export const GET_WEBSITES_BY_HOSTING = API_BASE_URL + '/websites';
export const GET_ACTIVITIES = API_BASE_URL + '/activities';

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
    let url = `${GET_ACTIVITIES}`;
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