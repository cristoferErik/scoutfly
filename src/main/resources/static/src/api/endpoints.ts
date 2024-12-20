export const API_BASE_URL = '/scoutfly/api';

export const GET_USERS= API_BASE_URL +'/clients';



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