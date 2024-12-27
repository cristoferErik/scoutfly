import { Hosting } from "../app/models/Hosting.js";
import { HostingService } from "../app/services/HostingService.js";
import { WebSiteUI } from "./WebSiteUI.js";

export class HostingUI {
    private hostingService: HostingService;
    private clienteId:number;

    constructor(clienteId:number) {
        this.hostingService = new HostingService();
        this.clienteId=clienteId;
    }
    async renderHostings() {
        const body = document.getElementById("body");
        if(!body) return;
        const hostingCard= document.createElement("div");
        hostingCard.id="hosting-card";
        hostingCard.className="card";
        hostingCard.innerHTML=
            `
            <div id="hosting-container" >
                <div class="container-bigTittle">
                    <p>Hosting</p>
                </div>
                <div class="table-container"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
            `;
        body.appendChild(hostingCard);
        const tableContainer = hostingCard.querySelector(".table-container");
        if (!tableContainer) return;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const hostings = await this.hostingService.getAllHostingsByClient(this.clienteId);
        if (hostings.length > 0) {
            console.log(hostings.length);
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
                                <th>url</th>
                                <th>usernameHosting</th>
                                <th>passwordHosting</th>
                                <th>proveedor</th>
                                <th>data dataCreazione</th>
                                <th>dataModifica</th>
                                <th>action</th>
                            </tr>
                                
                    `;
                /*------------------------HEADER------------------------------- */
                /*-------------------------BODY-------------------------------- */
                const body = document.createElement('tbody');
                body.classList.add('tbody');
                {
                    /*-------------------------ROW------------------------------ */
                    hostings.forEach((hosting) => {
                        const row = document.createElement('tr');
                        row.innerHTML =
                            `
                                <td>${hosting.id}</td>
                                <td>${hosting.nome}</td>
                                <td>${hosting.url}</td>
                                <td>${hosting.usernameHosting}</td>
                                <td>${hosting.passwordHosting}</td>
                                <td>${hosting.proveedor}</td>
                                <td>${hosting.dataCreazione}</td>
                                <td>${hosting.dataModifica}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red">elimina</button>
                                        <button type="button" name="seleziona" class="button bt-light-blue" value="${hosting.id}">
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
        this.addEventListenerHostingButton(this.hostingService);
        this.addModalInsertHosting();
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerHostingButton(hostingService: HostingService): void {
        const element = document.getElementById("hosting-container");
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
                        break;
                    case "elimina":
                        console.log("elimina");
                        break;
                    case "seleziona":
                        console.log("seleziona");
                        let hostingId: number | null;
                        if (button?.value) {
                            hostingId = parseInt(button?.value);
                            let hosting: Hosting | undefined = hostingService.hostings.find(
                                (hosting) => hosting.id === hostingId
                            );
                            if (hosting) {
                                try {
                                    const hostingCard =document.getElementById("hosting-card");
                                    hostingCard?.remove();

                                    this.segmentHosting(hosting);
                                    let webSiteUI=new WebSiteUI(hosting.id);
                                    webSiteUI.renderWebSites();
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
    segmentHosting(hosting: Hosting): void {
        const body = document.getElementById("body");
        if(!body) return;
        const hostingCard= document.createElement("div");
        hostingCard.id="hosting-card";
        hostingCard.className="card";

        hostingCard.innerHTML=
            `
                <div id="hosting-segment" class="segment">
                    <div class="container-data">
                        <div class="title">
                            <div>Hosting</div>
                            <div class="button-container">
                                <button class="button" name="back"  type="button"><-Back</button>
                            </div>
                        </div>
                        <div class="container-detail">
                            <div class="item">
                                <div class="subtitle">Id</div>
                                <div >${hosting.id}</div>
                            </div>
                            <div class="item">
                                <div class="subtitle">Nome</div>
                                <div >${hosting.nome}</div>
                            </div>
                            <div class="item">
                                <div class="subtitle">Url</div>
                                <div>${hosting.url}</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        body.appendChild(hostingCard);
        this.addEventListenerHostingSegment();
    }

    addEventListenerHostingSegment(): void {
        const hostingSegment = document.getElementById("hosting-segment");
        if (hostingSegment) {
            const buttonContainers = hostingSegment.querySelectorAll(".button");
            buttonContainers?.forEach(buttonContainer => {
                buttonContainer?.addEventListener('click', (event) => {
                    const target = event?.target as HTMLElement;
                    const button = target?.closest('button');
                    if (!button) return;

                    switch (button.name) {
                        case 'back':
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
        addModalInsertHosting(){
            let hostingCard=document.getElementById("hosting-card");
            let buttons=hostingCard?.querySelectorAll('[name]');
            buttons?.forEach((button) => {
                let btn = button as HTMLInputElement;
                if(btn.name=='inserire'){
                    btn.addEventListener('click',() => {
                        this.modalInsertHosting();
                    });
                }
            });
        }
        modalInsertHosting(){
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
                <div class="card-modal">
                    <div class="container-bigTittle">
                        <p>Nuovo Hosting</p>
                    </div>
                    <div class="items">
                        <div class="item">
                            <label for="">nome</label>
                            <input name="nome" type="text">
                        </div>
                    </div>
                    <div class="items">
                        <div class="item">
                            <label for="">proveedor</label>
                            <input name="proveedor" type="text">
                        </div>
                        <div class="item">
                            <label for="">url</label>
                            <input name="url" type="text">
                        </div>
                    </div>
                    <div class="items">
                        <div class="item">
                            <label for="">username</label>
                            <input name="username" type="text">
                        </div>
                        <div class="item"> 
                            <label for="">password</label>
                            <input name="password" type="text">
                        </div>
                    </div>
                    <div class="button-container mg-y-1">
                        <button class="button bt-green" name="inserire" type="button">Inserire</button>
                    </div>
                </div>
            `;
            modal.innerHTML=contenuto;
        }

    reloadUIs(){
        document.getElementById('hosting-card')?.remove();
        document.getElementById('website-card')?.remove();
        document.getElementById('activity-card')?.remove();
        this.renderHostings();
    }
}
