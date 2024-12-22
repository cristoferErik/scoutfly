import { WebSite } from "../app/models/WebSite.js";
import { WebSiteService } from "../app/services/WebSiteService.js";
import { Activity, ActivityFilters } from "../app/models/Activity.js";
import { ActivityUI } from "./ActivityUI.js";

export class WebSiteUI {
    private webSiteService: WebSiteService;
    private activityUI: ActivityUI;
    constructor() {
        this.webSiteService = new WebSiteService();
        this.activityUI = new ActivityUI();
    }
    async renderWebSites(hostingId: number) {
        this.openUI();
        const hostingContainer = document.getElementById("website-container");
        if (!hostingContainer) return;
        hostingContainer.style.display=`block`;
        const tableContainer = hostingContainer.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML=``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const websites = await this.webSiteService.getAllWebSitesByHosting(hostingId);
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
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton(webSiteService: WebSiteService): void {
        const element = document.getElementById("website-container");
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
                        let websiteId: number | null;
                        if (button?.value) {
                            websiteId = parseInt(button?.value);
                            let website: WebSite | undefined = webSiteService.websites.find(
                                (website) => website.id === websiteId
                            );
                            if (website) {
                                try {
                                    const websiteContainer =document.getElementById("website-container");
                                    
                                    if (websiteContainer) websiteContainer.style.display = "none"; //Sparirà la tabella
                                    this.segmentWebSite(website);
                                    
                                    let activityFilters=new ActivityFilters();
                                    activityFilters.webSiteId=website.id;
                                    this.activityUI.renderActivities(activityFilters);
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
        const websiteSegment = document.getElementById("website-segment");
        if (!websiteSegment) return;
        websiteSegment.style.display = "block";
        websiteSegment.innerHTML = `
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
        `;
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
                            const websiteContainer = document.getElementById('website-container');
                            if (websiteContainer) websiteContainer.style.display = "block";//Sparirà la tabella
                            websiteSegment.style.display = "none";
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
    openUI(){
        const websiteCard=document.getElementById("website-card");
        if(websiteCard) websiteCard.style.display="block";
    }
    reloadUIs(){
        const activityCard = document.getElementById("activity-card");
        if(activityCard)activityCard.style.display=`none`;
        const activitySegment=document.getElementById("activity-segment");
        if(activitySegment) activitySegment.style.display="none";
    }
}
