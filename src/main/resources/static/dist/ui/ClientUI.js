var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*Questo script serve per caricare i dati quando si apra una finestra! */
import { addEventListenerClientButton } from "../modules/ClientModules.js";
import { ClientService } from "../app/services/ClientService.js";
export function renderClients() {
    return __awaiter(this, void 0, void 0, function* () {
        const clientContainer = document.getElementById("client-container");
        if (clientContainer) {
            clientContainer.innerHTML = "";
            const clientService = new ClientService();
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const clients = yield clientService.getAllClients();
            if (clients.length > 0) {
                /*------------------------TABLE------------------------------- */
                const table = document.createElement('table');
                table.classList.add('table');
                table.setAttribute('border', '1');
                {
                    /*------------------------HEADER------------------------------- */
                    const header = document.createElement('thead');
                    header.classList.add('theader');
                    header.innerHTML =
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
                    const body = document.createElement('tbody');
                    body.classList.add('tbody');
                    {
                        /*-------------------------ROW------------------------------ */
                        clients.forEach((client) => {
                            const row = document.createElement('tr');
                            row.innerHTML =
                                `
                            <td>${client.id}</td>
                            <td>${client.nome}</td>
                            <td>${client.cognome}</td>
                            <td>${client.indirizzo}</td>
                            <td>${client.telefono}</td>
                            <td>${client.email}</td>
                            <td>${client.createAt}</td>
                            <td>
                                <div class="button-container">
                                    <button type="button" name="vedi" class="button bt-green">vedi</button>
                                    <button type="button" name="elimina" class="button bt-red">elimina</button>
                                    <button type="button" name="seleziona" class="button bt-light-blue" data-client='${JSON.stringify(client)}'>
                                        <img class="icon" src="../../assets/images/check.svg" alt="">
                                    </button>
                                </div>
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
        addEventListenerClientButton('.button-container');
    });
}
renderClients();
