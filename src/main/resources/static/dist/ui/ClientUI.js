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
import { Client } from "../app/models/Client.js";
import { HostingUI } from "./HostingUI.js";
import { Pagination } from "../modules/Pagination.js";
import { GET_CLIENTS } from "../api/endpoints.js";
import { ActivityByClientUI } from "./ActivityByClientUI.js";
import { addSelectRowOfTable } from "../utils/Tools.js";
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
                <div class="parameters"></div>
                <div class="table-container"></div>
                <div class="pagination"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
            body.appendChild(clientCard);
            this.addFieldParameters();
            yield this.renderTableClients(null);
            this.addModalInsertClient();
        });
    }
    renderTableClients(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const clientCard = document.getElementById("client-card");
            if (!clientCard)
                return;
            const tableContainer = clientCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const clients = yield this.clientService.getAllClients(parameters);
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
                                        <button type="button" name="elimina" class="button bt-red" value="${client.id}">elimina</button>
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
            this.addPagination();
            addSelectRowOfTable();
        });
    }
    addFieldParameters() {
        let clientCard = document.getElementById("client-card");
        if (!clientCard)
            return;
        let parameters = clientCard.querySelector(".parameters");
        if (!parameters)
            return;
        parameters.innerHTML =
            `
                <div class="container">
                    <div class="items">
                        <div class="item">
                            <p>Nome</p>
                            <input type="text" name="nome">
                        </div>
                        <div class="item">
                            <p>Email</p>
                            <input type="text" name="email">
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="button" type="button">Cerca</button>
                    </div>
                </div>
            `;
        this.addEventListenerToParameter();
    }
    addEventListenerToParameter() {
        var _a;
        let clientCard = document.getElementById("client-card");
        if (!clientCard)
            return;
        let parameters = clientCard.querySelector(".parameters");
        if (!parameters)
            return;
        let buttonContainer = parameters.querySelector(".button-container");
        if (!buttonContainer)
            return;
        (_a = buttonContainer.querySelector(".button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let inputs = parameters.querySelectorAll("[name]");
            let url = GET_CLIENTS + "?";
            let name = "";
            let email = "";
            inputs.forEach(input => {
                let element = input;
                switch (element.name) {
                    case 'nome':
                        name = "nome=" + element.value.trim();
                        break;
                    case 'email':
                        email = "email=" + element.value.trim();
                        break;
                    default:
                        break;
                }
            });
            url += name + "&" + email;
            //console.log(url);
            this.renderTableClients(url);
        });
    }
    //Qui aggiungiamo la impagionazione
    addPagination() {
        let linkPages = this.clientService.pageLinks;
        if (!linkPages)
            return;
        let clientContainer = document.getElementById("client-container");
        if (!clientContainer)
            return;
        Pagination(linkPages, clientContainer);
        this.addEventListenerToPagination(clientContainer);
    }
    //Inseriamo un'evento alla paginazione
    addEventListenerToPagination(clientContainer) {
        let activeLinks = clientContainer.querySelectorAll(".active");
        activeLinks.forEach(link => {
            link.addEventListener("click", () => {
                const value = link.getAttribute("value");
                //console.log(value);
                this.renderTableClients(value);
            });
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
                var _a;
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
                        this.modalDeleteClient(parseInt(button.value));
                        break;
                    case "seleziona":
                        //console.log("seleziona");
                        let clientId;
                        if (button.value) {
                            clientId = parseInt(button === null || button === void 0 ? void 0 : button.value);
                            let client = clientService.clients.find((client) => client.id === clientId);
                            if (client) {
                                (_a = document.getElementById("client-card")) === null || _a === void 0 ? void 0 : _a.remove();
                                //Qui si vedrà la tabella di hosting e il segmento di cliente!
                                this.segmentClient(client);
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
                            <button class="button" name="activities" type="button">Activities</button>
                            <button class="button" name="hosting" type="button">Hosting</button>
                        </div>
                    </div>
                    <div class="container-detail">
                        <div class="item">
                            <input type="hidden" id="clientId" value="${client.id}">
                            <div class="subtitle">Id</div>
                            <div>${client.id}</div>
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
                    let input;
                    let clientId;
                    switch (button.name) {
                        case "back":
                            this.removeUIs();
                            this.renderClients();
                            break;
                        case "hosting":
                            input = document.getElementById("clientId");
                            if (!input)
                                break;
                            let hostingCard = document.getElementById('hosting-card');
                            clientId = parseInt(input.value);
                            let hostingUI = new HostingUI(clientId);
                            if (!hostingCard) {
                                hostingUI.renderHostings();
                            }
                            else {
                                hostingUI.removeUIs();
                            }
                            break;
                        case "activities":
                            input = document.getElementById("clientId");
                            if (!input)
                                break;
                            let activityCard = document.getElementById('activity-card');
                            clientId = parseInt(input.value);
                            let activityUI = new ActivityByClientUI(clientId);
                            if (!activityCard) {
                                activityUI.renderActivitiesByClient();
                            }
                            else {
                                activityUI.removeUIs();
                            }
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
                    <input type="hidden" name="id">
                </div>
                <div class="items">
                    <div class="item">
                        <label for="Nome">Nome</label>
                        <input name="nome" type="text">
                    </div>
                    <div class="item"> 
                        <label for="Cognome">Cognome</label>
                        <input name="cognome" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Indirizzo</label>
                        <input name="indirizzo" type="text">
                    </div>
                    <div class="item">
                        <label for="">Telefono</label>
                        <input name="telefono" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Email</label>
                        <input name="email" type="text">
                    </div>
                </div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="salva" type="button">salva</button>
                </div>
            </form>
        `;
        modal.innerHTML = contenuto;
        this.eventoSalvaClient();
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
                    case 'id':
                        if (client.id !== undefined) {
                            input.value = client.id.toString();
                        }
                        break;
                    case 'nome':
                        input.value = client.nome;
                        break;
                    case 'cognome':
                        input.value = client.cognome;
                        break;
                    case 'indirizzo':
                        input.value = client.indirizzo;
                        break;
                    case 'telefono':
                        input.value = client.telefono;
                        break;
                    case 'email':
                        input.value = client.email;
                        break;
                    default:
                        break;
                }
            }
        });
    }
    eventoSalvaClient() {
        let clientForm = document.getElementById("clienteForm");
        let buttonContainer = clientForm.querySelector(".button-container");
        if (!buttonContainer)
            return;
        let buttons = buttonContainer.querySelectorAll(".button");
        buttons.forEach(button => {
            let btn = button;
            btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                switch (btn.name) {
                    case 'salva':
                        yield this.salvaCliente();
                        this.closeModal();
                        this.renderTableClients(null);
                        break;
                    default:
                        break;
                }
            }));
        });
    }
    salvaCliente() {
        return __awaiter(this, void 0, void 0, function* () {
            let clientForm = document.getElementById("clienteForm");
            let client = new Client();
            const formData = new FormData(clientForm);
            const id = Number(formData.get('id'));
            client.id = id == 0 ? undefined : id;
            client.nome = formData.get('nome');
            client.cognome = formData.get('cognome');
            client.indirizzo = formData.get('indirizzo');
            client.telefono = formData.get('telefono');
            client.email = formData.get('email');
            let message = yield this.clientService.fetchSaveClientService(client);
            return message;
        });
    }
    modalDeleteClient(clientId) {
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
            <div class="card-modal">
                <div class="container-bigTittle">
                    <p>Sei Sicuro di voler eliminare?</p>
                </div>
                <div class="button-container mg-y-1">
                    <button class="button bt-red" name="elimina" type="button" value="${clientId}">Elimina</button>
                    <button class="button bt-green" name="cancella" type="button">Cancella</button>
                </div>
            </div>
        `;
        modal.innerHTML = contenuto;
        this.addEventListenerDeleteClient();
    }
    addEventListenerDeleteClient() {
        let modal = document.getElementById('modal');
        if (!modal)
            return;
        let buttons = modal.querySelectorAll(".button");
        buttons.forEach((button) => {
            let btn = button;
            button.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                switch (btn.name) {
                    case 'elimina':
                        yield this.clientService.deleteClientService(parseInt(btn.value));
                        this.closeModal();
                        this.renderTableClients(null);
                        break;
                    case 'cancella':
                        this.closeModal();
                        this.renderTableClients(null);
                        break;
                    default:
                        break;
                }
            }));
        });
    }
    removeUIs() {
        var _a, _b, _c, _d;
        (_a = document.getElementById('client-card')) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.getElementById('hosting-card')) === null || _b === void 0 ? void 0 : _b.remove();
        (_c = document.getElementById('website-card')) === null || _c === void 0 ? void 0 : _c.remove();
        (_d = document.getElementById('activity-card')) === null || _d === void 0 ? void 0 : _d.remove();
    }
    closeModal() {
        let modal = document.getElementById('modal');
        if (!modal)
            return;
        modal.style.display = "none";
        modal.innerHTML = ``;
    }
}
