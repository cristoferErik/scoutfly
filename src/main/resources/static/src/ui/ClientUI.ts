/*Questo script serve per caricare i dati quando si apra una finestra! */
import { ClientService } from "../app/services/ClientService.js";


export async function renderClients() {
    const clientContainer = document.getElementById("client-container");
    if(clientContainer){
        clientContainer.innerHTML = "";
        const clientService= new ClientService();
        //Se aggiungiamo await aspettara che finisca per poter continuare
        const clients= await clientService.getAllClients();
        if(clients.length>0){
            let container=``;
            clients.forEach((client)=>{
                container=`
                    <div>
                        <div>Nome</div>
                        <div>Cognome</div>
                        <div>Indirizzo</div>
                        <div>telefono</div>
                        <div>Email</div>
                    </div>
                `;
            });

        }
    }
}
renderClients();