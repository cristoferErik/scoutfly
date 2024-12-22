/*Questo script serve per caricare i dati quando si apra una finestra! */
import { ClientService } from "../app/services/ClientService.js";
import { Client } from "../app/models/Client.js";
import { HostingUI } from "./HostingUI.js";

export class ClientUI {
    private clientService: ClientService;
    private hostingUI: HostingUI;
    constructor() {
        this.clientService = new ClientService();
        this.hostingUI = new HostingUI();
    }
    async renderClients() {
        this.openUI();
        const clientContainer = document.getElementById("client-container");
        if (!clientContainer) return;
        const tableContainer = clientContainer.querySelector(".table-container");
        if (!tableContainer) return;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const clients = await this.clientService.getAllClients();
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
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerClientButton(clientService: ClientService): void {
        const element = document.getElementById("client-container");
        if (!element) return;
        const buttonContainers = element.querySelectorAll(".button-container");
        buttonContainers.forEach((buttonContainer) => {
            buttonContainer?.addEventListener("click", (event) => {
                const target = event?.target as HTMLElement;
                const button = target?.closest("button");
                if (!button) return;

                switch (button.name) {
                    case "vedi":
                        break;
                    case "elimina":
                        console.log("elimina");
                        break;
                    case "seleziona":
                        console.log("seleziona");
                        let clientId: number | null;
                        if (button?.value) {
                            clientId = parseInt(button?.value);
                            let client: Client | undefined = clientService.clients.find(
                                (client) => client.id === clientId
                            );
                            if (client) {
                                try {
                                    const clientContainer =
                                        document.getElementById("client-container");
                                    if (clientContainer) clientContainer.style.display = "none"; //Sparirà la tabella
                                    //Qui si vedrà la tabella di hosting e il segmento di cliente!
                                    this.segmentClient(client);

                                    this.hostingUI.renderHostings(client.id);
                                } catch (error) {
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
    segmentClient(client: Client): void {
        const clientSegment = document.getElementById("client-segment");
        if (!clientSegment) return;
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

    addEventListenerClientSegment(): void {
        const clientSegment = document.getElementById("client-segment");
        if (clientSegment) {
            const buttonContainers = clientSegment.querySelectorAll(".button");
            buttonContainers?.forEach((buttonContainer) => {
                buttonContainer?.addEventListener("click", (event) => {
                    const target = event?.target as HTMLElement;
                    const button = target?.closest("button");
                    if (!button) return;
                    switch (button.name) {
                        case "back":
                            const clientContainer =
                                document.getElementById("client-container");
                            if (clientContainer) clientContainer.style.display = "block"; //Sparirà la tabella
                            this.reloadUIs();
                            break;
                        default:
                            console.log("Azione sconosciuta");
                            break;
                    }
                });
            });
        } else {
            console.error("clientSegment doesnt exist!");
        }
    }
    openUI(){
        const clientCard=document.getElementById(`client-card`);
        if(clientCard)clientCard.style.display=`block`;
    }
    reloadUIs(){
        const clientSegment=document.getElementById("client-segment");
        if(clientSegment)clientSegment.style.display=`none`;
        
        const hostingCard = document.getElementById("hosting-card");
        if(hostingCard)hostingCard.style.display=`none`;
        const hostingSegment=document.getElementById("hosting-segment");
        if(hostingSegment) hostingSegment.style.display="none";

        const websiteCard = document.getElementById("website-card");
        if(websiteCard)websiteCard.style.display=`none`;
        const websiteSegment=document.getElementById("website-segment");
        if(websiteSegment) websiteSegment.style.display="none";
    }
}
