import { Activity, ActivityFilters } from "../app/models/Activity";
import { Client } from "../app/models/Client";

export const API_BASE_URL = '/scoutfly/api';

export const GET_USERS= API_BASE_URL +'/clients';
export const GET_HOSTINGS_BY_CLIENT=API_BASE_URL + '/hostings';
export const GET_WEBSITES_BY_HOSTING=API_BASE_URL + '/websites';
export const GET_ACTIVITIES_BY_WEBSITE=API_BASE_URL + '/activities';

//Con questo ottengo i dati che vengo del backend
export async function fetchAllClients<T>(): Promise<T | null> {
    let data:T|null=null;
    try {
        const response = await fetch(GET_USERS, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        } 
        const responseData= await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}
export async function fetchAllHostingsByClient<T>(clientId:number): Promise<T | null> {
    let data:T|null=null;
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
        const responseData= await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}
export async function fetchAllWebSiteByHosting<T>(hostingId:number): Promise<T| null>{
    let data:T|null=null;
    try {
        const response = await fetch(`${GET_WEBSITES_BY_HOSTING}?hostingId=${hostingId}`, {
            method: 'GET', // Método de la solicitud
            headers: {
                'Content-Type': 'application/json', // Cabecera
            },
        });

        // Verificar si la respuesta es exitosa (status 200-299)
        if (!response.ok) {
            throw new Error('HTTP Error: ' + response.statusText);
        } 
        const responseData= await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}
export async function fetchAllActivitiesByWebSite<T>(webSiteId:number,activityFilters:ActivityFilters): Promise<T| null>{
    let data:T|null=null;
    try {
        const response = await fetch(`${GET_ACTIVITIES_BY_WEBSITE}/${webSiteId}`, {
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
        const responseData= await response.json();
        data = responseData.body;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    return data;
}