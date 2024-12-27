import { WebSite } from "../app/models/WebSite.js";
import { WebSiteService } from "../app/services/WebSiteService.js";
import { Activity, ActivityFilters } from "../app/models/Activity.js";
import { ActivityUI } from "./ActivityUI.js";

export class WebSiteUI {
    private webSiteService: WebSiteService;
    private hostingId:number;
    constructor(hostingId: number) {
        this.webSiteService = new WebSiteService();
        this.hostingId=hostingId;
    }
    async renderWebSites() {
        const body = document.getElementById("body");
        if(!body) return;
        const websiteCard= document.createElement("div");
        websiteCard.id="website-card";
        websiteCard.className="card";
        websiteCard.innerHTML=
        `
            <div id="website-container">
                <div class="container-bigTittle">
                    <p>Web Site</p>
                </div>
                <div class="table-container"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        body.appendChild(websiteCard);
        const tableContainer = websiteCard.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML=``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const websites = await this.webSiteService.getAllWebSitesByHosting(this.hostingId);
        if (websites.length > 0) {
            console.log(websites.length);
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
                    websites.forEach((website) => {
                        const row = document.createElement('tr');
                        row.innerHTML =
                            `
                                <td>${website.id}</td>
                                <td>${website.nome}</td>
                                <td>${website.url}</td>
                                <td>${website.dataAggiornamento}</td>
                                <td>${website.dataBackup}</td>
                                <td>${website.descrizione}</td>
                                <td>${website.dataCreazione}</td>
                                <td>${website.dataModifica}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red">elimina</button>
                                        <button type="button" name="seleziona" class="button bt-light-blue" value="${website.id}">
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
        this.addEventListenerWebSiteButton(this.webSiteService);
        this.addModalInsertWebSite();
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton(webSiteService: WebSiteService): void {
        const element = document.getElementById("website-container");
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
                        let websiteId: number | null;
                        if (button?.value) {
                            websiteId = parseInt(button?.value);
                            let website: WebSite | undefined = webSiteService.websites.find(
                                (website) => website.id === websiteId
                            );
                            if (website) {
                                try {
                                    const websiteCard =document.getElementById("website-card");
                                    websiteCard?.remove();

                                    this.segmentWebSite(website);
                                    
                                    let activity:ActivityUI=new ActivityUI(website.id);
                                    activity.renderActivities();
                                    
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
    segmentWebSite(website: WebSite): void {
        const body = document.getElementById("body");
        if(!body) return;
        const websiteCard= document.createElement("div");
        websiteCard.id="website-card";
        websiteCard.className="card";
        websiteCard.innerHTML=
        `
            <div id="website-segment" class="segment">
                <div class="container-data">
                    <div class="title">
                        <div>WebSite</div>
                        <div class="button-container">
                            <button class="button" name="back"  type="button"><-Back</button>
                        </div>
                    </div>
                    <div class="container-detail">
                        <div class="item">
                            <div class="subtitle">Id</div>
                            <div >${website.id}</div>
                        </div>
                        <div class="item">
                            <div class="subtitle">Nome</div>
                            <div >${website.nome}</div>
                        </div>
                        <div class="item">
                            <div class="subtitle">Url</div>
                            <div>${website.url}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        body.appendChild(websiteCard);
        this.addEventListenerWebSiteSegment();
    }

    addEventListenerWebSiteSegment(): void {
        const websiteSegment = document.getElementById("website-segment");
        if (websiteSegment) {
            const buttonContainers = websiteSegment.querySelectorAll(".button");
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
            console.error("websiteSegment doesnt exist!");
        }

    }
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertWebSite(){
        let hostingCard=document.getElementById("website-card");
        let buttons=hostingCard?.querySelectorAll('[name]');
        buttons?.forEach((button) => {
            let btn = button as HTMLInputElement;
            if(btn.name=='inserire'){
                btn.addEventListener('click',() => {
                    this.modalInsertWebSite();
                });
            }
        });
    }
    modalInsertWebSite(){
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
                    <p>Nuovo WebSite</p>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">nome</label>
                        <input name="nome" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="url">url</label>
                        <input name="url" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="dataAggiornamento">dataAggiornamento</label>
                        <input name="dataAggiornamento" type="date">
                    </div>
                    <div class="item">
                        <label for="dataBackup">dataBackup</label>
                        <input name="dataBackup" type="Date">
                    </div>
                </div>
                <div class="text-container">
                    <label for="descrizione">descrizione</label>
                    <textarea name="descrizione" type="text" id="descrizione"></textarea>
                </div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        modal.innerHTML=contenuto;
    }

    reloadUIs(){
        document.getElementById('website-card')?.remove();
        document.getElementById('activity-card')?.remove();
        this.renderWebSites();
    }
}
