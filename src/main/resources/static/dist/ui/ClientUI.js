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
import { ClientService } from "../app/services/ClientService.js";
import { HostingUI } from "./HostingUI.js";
export class ClientUI {
    constructor() {
        this.clientService = new ClientService();
    }
    renderClients() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = document.getElementById("body");
            if (!body)
                return;
            const clientCard = document.createElement("div");
            clientCard.id = "client-card";
            clientCard.className = "card";
            clientCard.innerHTML =
                `
            <div id="client-container">
                <div class="container-bigTittle">
                    <p>Clients</p>
                </div>
                <div class="table-container"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
            body.appendChild(clientCard);
            const tableContainer = clientCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const clients = yield this.clientService.getAllClients();
            if (clients.length > 0) {
                /*------------------------TABLE------------------------------- */
                const table = document.createElement("table");
                table.classList.add("table");
                table.setAttribute("border", "1");
                {
                    /*------------------------HEADER------------------------------- */
                    const header = document.createElement("thead");
                    header.classList.add("theader");
                    header.innerHTML = `       
                            <tr>
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
                    /*-------------------------BODY-------------------------------- */
                    const body = document.createElement("tbody");
                    body.classList.add("tbody");
                    {
                        /*-------------------------ROW------------------------------ */
                        clients.forEach((client) => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${client.id}</td>
                                <td>${client.nome}</td>
                                <td>${client.cognome}</td>
                                <td>${client.indirizzo}</td>
                                <td>${client.telefono}</td>
                                <td>${client.email}</td>
                                <td>${client.createAt}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green" value="${client.id}">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red">elimina</button>
                                        <button type="button" name="seleziona" class="button bt-light-blue" value="${client.id}">
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
                tableContainer.appendChild(table);
            }
            this.addEventListenerClientButton(this.clientService);
            this.addModalInsertClient();
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerClientButton(clientService) {
        const element = document.getElementById("client-container");
        if (!element)
            return;
        const tableContainer = element.querySelector(".table-container");
        if (!tableContainer)
            return;
        const buttonContainers = tableContainer.querySelectorAll(".button-container");
        buttonContainers.forEach((buttonContainer) => {
            buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener("click", (event) => {
                const target = event === null || event === void 0 ? void 0 : event.target;
                const button = target === null || target === void 0 ? void 0 : target.closest("button");
                if (!button)
                    return;
                switch (button.name) {
                    case "vedi":
                        this.modalInsertClient();
                        this.updateModalClient(parseInt(button.value));
                        break;
                    case "elimina":
                        console.log("elimina");
                        break;
                    case "seleziona":
                        console.log("seleziona");
                        let clientId;
                        if (button === null || button === void 0 ? void 0 : button.value) {
                            clientId = parseInt(button === null || button === void 0 ? void 0 : button.value);
                            let client = clientService.clients.find((client) => client.id === clientId);
                            if (client) {
                                try {
                                    const clientCard = document.getElementById("client-card");
                                    clientCard === null || clientCard === void 0 ? void 0 : clientCard.remove();
                                    //Qui si vedrà la tabella di hosting e il segmento di cliente!
                                    this.segmentClient(client);
                                    let hostingUI = new HostingUI(client.id);
                                    hostingUI.renderHostings();
                                }
                                catch (error) {
                                    console.error("Error parsing JSON:", error);
                                }
                            }
                        }
                        break;
                    default:
                        console.log("Azione sconosciuta!");
                        break;
                }
            });
        });
    }
    /*La riga che si mostra quando si clica dentro del bottone seleziona */
    segmentClient(client) {
        const body = document.getElementById("body");
        if (!body)
            return;
        const clientCard = document.createElement("div");
        clientCard.id = "client-card";
        clientCard.className = "card";
        clientCard.innerHTML =
            `
            <div id="client-segment" class="segment">
                <div class="container-data">
                    <div class="title">
                        <div>Cliente</div>
                        <div class="button-container">
                            <button class="button" name="back"  type="button"><-Back</button>
                        </div>
                    </div>
                    <div class="container-detail">
                        <div class="item">
                            <div class="subtitle">Id</div>
                            <div >${client.id}</div>
                        </div>
                        <div class="item">
                            <div class="subtitle">Nome</div>
                            <div >${client.nome}  ${client.cognome}</div>
                        </div>
                        <div class="item">
                            <div class="subtitle">Email</div>
                            <div>${client.email}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        body.appendChild(clientCard);
        this.addEventListenerClientSegment();
    }
    addEventListenerClientSegment() {
        const clientSegment = document.getElementById("client-segment");
        if (clientSegment) {
            const buttonContainers = clientSegment.querySelectorAll(".button");
            buttonContainers === null || buttonContainers === void 0 ? void 0 : buttonContainers.forEach((buttonContainer) => {
                buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener("click", (event) => {
                    const target = event === null || event === void 0 ? void 0 : event.target;
                    const button = target === null || target === void 0 ? void 0 : target.closest("button");
                    if (!button)
                        return;
                    switch (button.name) {
                        case "back":
                            this.reloadUIs();
                            break;
                        default:
                            console.log("Azione sconosciuta");
                            break;
                    }
                });
            });
        }
        else {
            console.error("clientSegment doesnt exist!");
        }
    }
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertClient() {
        let clientCard = document.getElementById("client-card");
        let buttons = clientCard === null || clientCard === void 0 ? void 0 : clientCard.querySelectorAll('[name]');
        buttons === null || buttons === void 0 ? void 0 : buttons.forEach((button) => {
            let btn = button;
            if (btn.name == 'inserire') {
                btn.addEventListener('click', () => {
                    this.modalInsertClient();
                });
            }
        });
    }
    modalInsertClient() {
        let modal = document.getElementById('modal');
        /*In caso fai clic fuori del modal, si chiudera */
        modal === null || modal === void 0 ? void 0 : modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.innerHTML = ``;
            }
        });
        if (!modal)
            return;
        modal.style.display = "flex";
        modal.innerHTML = ``;
        let contenuto = `
            <form class="card-modal" id="clienteForm">
                <div class="container-bigTittle">
                    <p>Nuovo Cliente</p>
                    <input type="hidden" name="Id">
                </div>
                <div class="items">
                    <div class="item">
                        <label for="Nome">Nome</label>
                        <input name="Nome" type="text">
                    </div>
                    <div class="item"> 
                        <label for="Cognome">Cognome</label>
                        <input name="Cognome" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Indirizzo</label>
                        <input name="Indirizzo" type="text">
                    </div>
                    <div class="item">
                        <label for="">Telefono</label>
                        <input name="Telefono" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Email</label>
                        <input name="Email" type="text">
                    </div>
                </div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">salva</button>
                </div>
            </form>
        `;
        modal.innerHTML = contenuto;
    }
    updateModalClient(id) {
        let client = this.clientService.clients.find((client) => client.id === id);
        if (!client)
            return;
        let form = document.getElementById("clienteForm");
        if (!form)
            return;
        let inputs = form.querySelectorAll("[name]");
        if (!inputs || inputs.length == 0)
            return;
        inputs.forEach(function (input) {
            if (input instanceof HTMLInputElement) {
                switch (input.name) {
                    case 'Id':
                        input.value = client.id.toString();
                        break;
                    case 'Nome':
                        input.value = client.nome;
                        break;
                    case 'Cognome':
                        input.value = client.cognome;
                        break;
                    case 'Indirizzo':
                        input.value = client.indirizzo;
                        break;
                    case 'Telefono':
                        input.value = client.telefono;
                        break;
                    case 'Email':
                        input.value = client.email;
                        break;
                    default:
                        break;
                }
            }
        });
    }
    reloadUIs() {
        var _a, _b, _c, _d;
        (_a = document.getElementById('client-card')) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById('hosting-card')) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = document.getElementById('website-card')) === null || _c === void 0 ? void 0 : _c.remove();
        (_d = document.getElementById('activity-card')) === null || _d === void 0 ? void 0 : _d.remove();
        this.renderClients();
    }
}
