/*Questo script serve per caricare i dati quando si apra una finestra! */
import { addEventListenerButton } from "../app/modules/Buttons.js";
import { ClientService } from "../app/services/ClientService.js";

export async function renderClients() {
    const clientContainer = document.getElementById("client-container");
    if(clientContainer){
        clientContainer.innerHTML = "";
        const clientService= new ClientService();
        //Se aggiungiamo await aspettara che finisca per poter continuare
        const clients= await clientService.getAllClients();
        if(clients.length>0){
            /*------------------------TABLE------------------------------- */
            const table=document.createElement('table');
            table.classList.add('table');
            {
                /*------------------------HEADER------------------------------- */
                const header= document.createElement('thead');
                header.classList.add('theader');
                header.innerHTML=
                `       <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Indirizzo</th>
                            <th>telefono</th>
                            <th>Email</th>
                            <th>data creazione</th>
                            <th>action</th>
                        </tr>
                            
                `;
                /*------------------------HEADER------------------------------- */
                /*-------------------------BODY------------------------------ */
                const body= document.createElement('tbody');
                body.classList.add('tbody');
                {
                    /*-------------------------ROW------------------------------ */
                    clients.forEach((client)=>{
                        const row=document.createElement('tr');
                        row.innerHTML=
                        `
                            <td>${client.id}</td>
                            <td>${client.nome}</td>
                            <td>${client.cognome}</td>
                            <td>${client.indirizzo}</td>
                            <td>${client.telefono}</td>
                            <td>${client.email}</td>
                            <td>${client.createAt}</td>
                            <td class="button-container">
                                <button type="button" name="vedi" class="button bt-green">vedi</button>
                                <button type="button" name="elimina" class="button bt-red">elimina</button>
                                <button type="button" name="seleziona" class="button bt-light-blue" value=${client.id}>
                                    <img class="icon" src="../../assets/images/check.svg" alt="">
                                </button>
                            </td>
                        `;
                        body.appendChild(row);
                    });
                    /*-------------------------ROW------------------------------ */
                }
                table.appendChild(header);
                table.appendChild(body);
               /*-------------------------BODY------------------------------ */
            }
            /*------------------------TABLE------------------------------- */
            clientContainer.appendChild(table);
        }
    }
    addEventListenerButton('.button-container');
}
renderClients();

