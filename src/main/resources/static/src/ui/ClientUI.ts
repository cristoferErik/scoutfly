/*Questo script serve per caricare i dati quando si apra una finestra! */
import { ClientService } from "../app/services/ClientService.js";
import { Client } from "../app/models/Client.js";
import { HostingUI } from "./HostingUI.js";
import { Pagination } from "../modules/Pagination.js";

export class ClientUI {
    private clientService: ClientService;
    constructor() {
        this.clientService = new ClientService();
    }
    async renderClients(parameters:string | null) {
        const body = document.getElementById("body");
        if(!body) return;
        const clientCard= document.createElement("div");
        clientCard.id="client-card";
        clientCard.className="card";
        clientCard.innerHTML=
        `
            <div id="client-container">
                <div class="container-bigTittle">
                    <p>Clients</p>
                </div>
                <div class="table-container"></div>
                <div class="pagination"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        body.appendChild(clientCard);
        const tableContainer = clientCard.querySelector(".table-container");
        if (!tableContainer) return;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const clients = await this.clientService.getAllClients(parameters);
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
        this.addPagination();
    }
    //Qui aggiungiamo la impagionazione
    addPagination(){
        let linkPages=this.clientService.pageLinks;
        if(!linkPages) return;
        let clientContainer = document.getElementById("client-container");
        if (!clientContainer) return;
        Pagination(linkPages,clientContainer);
        this.addEventListenerToPagination(clientContainer);
    }
    //Inseriamo un'evento alla paginazione
    addEventListenerToPagination(clientContainer:HTMLElement){
        let activeLinks=clientContainer.querySelectorAll(".active");
        activeLinks.forEach(link=>{
            link.addEventListener("click",()=>{
                const value=link.getAttribute("value");
                this.removeUIs();
                this.renderClients(value);
            })
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerClientButton(clientService: ClientService): void {
        const element = document.getElementById("client-container");
        if (!element) return;
        const tableContainer = element.querySelector(".table-container");
        if(!tableContainer) return;
        const buttonContainers = tableContainer.querySelectorAll(".button-container");
        buttonContainers.forEach((buttonContainer) => {
            buttonContainer?.addEventListener("click", (event) => {
                const target = event?.target as HTMLElement;
                const button = target?.closest("button");
                if (!button) return;
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
                        let clientId: number | null;
                        if (button?.value) {
                            clientId = parseInt(button?.value);
                            let client: Client | undefined = clientService.clients.find(
                                (client) => client.id === clientId
                            );
                            if (client) {
                                try {
                                    const clientCard =document.getElementById("client-card");
                                    clientCard?.remove();
                                    //Qui si vedrà la tabella di hosting e il segmento di cliente!
                                    this.segmentClient(client);
                                    let hostingUI:HostingUI=new HostingUI(client.id);
                                    hostingUI.renderHostings();
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
        const body = document.getElementById("body");
        if(!body) return;
        const clientCard= document.createElement("div");
        clientCard.id="client-card";
        clientCard.className="card";
        clientCard.innerHTML=
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
                            this.removeUIs();
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
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertClient(){
        let clientCard=document.getElementById("client-card");
        let buttons=clientCard?.querySelectorAll('[name]');
        buttons?.forEach((button) => {
            let btn = button as HTMLInputElement;
            if(btn.name=='inserire'){
                btn.addEventListener('click',() => {
                    this.modalInsertClient();
                });
            }
        });
    }
    modalInsertClient(){
        let modal=document.getElementById('modal');
        /*In caso fai clic fuori del modal, si chiudera */
        modal?.addEventListener('click',(event)=>{
            if(event.target === modal){
                modal.style.display="none";
                modal.innerHTML=``;
            }
        });
        if(!modal) return;
        modal.style.display="flex";
        modal.innerHTML=``;
        let contenuto=`
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
        modal.innerHTML=contenuto;
    }
    updateModalClient(id:number){
        let client: Client | undefined = this.clientService.clients.find(
            (client) => client.id === id
        );
        if(!client) return;
        let form=document.getElementById("clienteForm") as HTMLFormElement;
        if(!form) return;
        let inputs = form.querySelectorAll("[name]");
        if(!inputs || inputs.length==0) return;

        inputs.forEach(function(input){
            if(input instanceof HTMLInputElement){
                switch(input.name){
                    case 'Id':
                        input.value=client.id.toString();
                        break;
                    case 'Nome':
                        input.value=client.nome;
                        break;
                    case 'Cognome':
                        input.value=client.cognome;
                        break;
                    case 'Indirizzo':
                        input.value=client.indirizzo;
                        break;
                    case 'Telefono':
                        input.value=client.telefono;
                        break;
                    case 'Email':
                        input.value=client.email;
                        break;
                    default:
                        break;
                }
            }
            
        });
    }

    removeUIs(){
        document.getElementById('client-card')?.remove();
        document.getElementById('hosting-card')?.remove();
        document.getElementById('website-card')?.remove();
        document.getElementById('activity-card')?.remove();
    }
    reloadUIs(){
        this.renderClients(null);
    }
}
