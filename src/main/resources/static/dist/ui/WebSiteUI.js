var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { WebSiteService } from "../app/services/WebSiteService.js";
import { ActivityFilters } from "../app/models/Activity.js";
import { ActivityUI } from "./ActivityUI.js";
export class WebSiteUI {
    constructor() {
        this.webSiteService = new WebSiteService();
        this.activityUI = new ActivityUI();
    }
    renderWebSites(hostingId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openUI();
            const hostingContainer = document.getElementById("website-container");
            if (!hostingContainer)
                return;
            hostingContainer.style.display = `block`;
            const tableContainer = hostingContainer.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const websites = yield this.webSiteService.getAllWebSitesByHosting(hostingId);
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
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton(webSiteService) {
        const element = document.getElementById("website-container");
        if (!element)
            return;
        const buttonContainers = element.querySelectorAll(".button-container");
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
                        let websiteId;
                        if (button === null || button === void 0 ? void 0 : button.value) {
                            websiteId = parseInt(button === null || button === void 0 ? void 0 : button.value);
                            let website = webSiteService.websites.find((website) => website.id === websiteId);
                            if (website) {
                                try {
                                    const websiteContainer = document.getElementById("website-container");
                                    if (websiteContainer)
                                        websiteContainer.style.display = "none"; //Sparirà la tabella
                                    this.segmentWebSite(website);
                                    let activityFilters = new ActivityFilters();
                                    activityFilters.webSiteId = website.id;
                                    this.activityUI.renderActivities(activityFilters);
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
    segmentWebSite(website) {
        const websiteSegment = document.getElementById("website-segment");
        if (!websiteSegment)
            return;
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
    addEventListenerWebSiteSegment() {
        const websiteSegment = document.getElementById("website-segment");
        if (websiteSegment) {
            const buttonContainers = websiteSegment.querySelectorAll(".button");
            buttonContainers === null || buttonContainers === void 0 ? void 0 : buttonContainers.forEach(buttonContainer => {
                buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener('click', (event) => {
                    const target = event === null || event === void 0 ? void 0 : event.target;
                    const button = target === null || target === void 0 ? void 0 : target.closest('button');
                    if (!button)
                        return;
                    switch (button.name) {
                        case 'back':
                            const websiteContainer = document.getElementById('website-container');
                            if (websiteContainer)
                                websiteContainer.style.display = "block"; //Sparirà la tabella
                            websiteSegment.style.display = "none";
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
            console.error("websiteSegment doesnt exist!");
        }
    }
    openUI() {
        const websiteCard = document.getElementById("website-card");
        if (websiteCard)
            websiteCard.style.display = "block";
    }
    reloadUIs() {
        const activityCard = document.getElementById("activity-card");
        if (activityCard)
            activityCard.style.display = `none`;
        const activitySegment = document.getElementById("activity-segment");
        if (activitySegment)
            activitySegment.style.display = "none";
    }
}
