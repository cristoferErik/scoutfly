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
        this.hostingUI = new HostingUI();
    }
    renderClients() {
        return __awaiter(this, void 0, void 0, function* () {
            this.openUI();
            const clientContainer = document.getElementById("client-container");
            if (!clientContainer)
                return;
            const tableContainer = clientContainer.querySelector(".table-container");
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
                                        <button type="button" name="vedi" class="button bt-green">vedi</button>
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
                                    const clientContainer = document.getElementById("client-container");
                                    if (clientContainer)
                                        clientContainer.style.display = "none"; //Sparirà la tabella
                                    //Qui si vedrà la tabella di hosting e il segmento di cliente!
                                    this.segmentClient(client);
                                    this.hostingUI.renderHostings(client.id);
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
        const clientSegment = document.getElementById("client-segment");
        if (!clientSegment)
            return;
        clientSegment.style.display = "block";
        clientSegment.innerHTML = `
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
        `;
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
                            const clientContainer = document.getElementById("client-container");
                            if (clientContainer)
                                clientContainer.style.display = "block"; //Sparirà la tabella
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
            <div class="card-modal">
                <div class="container-bigTittle">
                    <p>Nuovo Cliente</p>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Nome</label>
                        <input name="Nome" type="text">
                    </div>
                    <div class="item"> 
                        <label for="">Cognome</label>
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
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        modal.innerHTML = contenuto;
    }
    openUI() {
        const clientCard = document.getElementById(`client-card`);
        if (clientCard)
            clientCard.style.display = `block`;
    }
    reloadUIs() {
        const clientSegment = document.getElementById("client-segment");
        if (clientSegment)
            clientSegment.style.display = `none`;
        const hostingCard = document.getElementById("hosting-card");
        if (hostingCard)
            hostingCard.style.display = `none`;
        const hostingSegment = document.getElementById("hosting-segment");
        if (hostingSegment)
            hostingSegment.style.display = "none";
        this.hostingUI.reloadUIs();
    }
}
