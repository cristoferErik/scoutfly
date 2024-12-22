var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HostingService } from "../app/services/HostingService.js";
import { WebSiteUI } from "./WebSiteUI.js";
export class HostingUI {
    constructor() {
        this.hostingService = new HostingService();
        this.webSiteUI = new WebSiteUI();
    }
    renderHostings(clientId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.openUI();
            const hostingContainer = document.getElementById("hosting-container");
            if (!hostingContainer)
                return;
            hostingContainer.style.display = `block`;
            const tableContainer = hostingContainer.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const hostings = yield this.hostingService.getAllHostingsByClient(clientId);
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
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerHostingButton(hostingService) {
        const element = document.getElementById("hosting-container");
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
                        let hostingId;
                        if (button === null || button === void 0 ? void 0 : button.value) {
                            hostingId = parseInt(button === null || button === void 0 ? void 0 : button.value);
                            let hosting = hostingService.hostings.find((hosting) => hosting.id === hostingId);
                            if (hosting) {
                                try {
                                    const hostingContainer = document.getElementById("hosting-container");
                                    if (hostingContainer)
                                        hostingContainer.style.display = "none"; //Sparirà la tabella
                                    this.segmentHosting(hosting);
                                    this.webSiteUI.renderWebSites(hosting.id);
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
    segmentHosting(hosting) {
        const hostingSegment = document.getElementById("hosting-segment");
        if (!hostingSegment)
            return;
        hostingSegment.style.display = "block";
        hostingSegment.innerHTML = `
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
        `;
        this.addEventListenerHostingSegment();
    }
    addEventListenerHostingSegment() {
        const hostingSegment = document.getElementById("hosting-segment");
        if (hostingSegment) {
            const buttonContainers = hostingSegment.querySelectorAll(".button");
            buttonContainers === null || buttonContainers === void 0 ? void 0 : buttonContainers.forEach(buttonContainer => {
                buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener('click', (event) => {
                    const target = event === null || event === void 0 ? void 0 : event.target;
                    const button = target === null || target === void 0 ? void 0 : target.closest('button');
                    if (!button)
                        return;
                    switch (button.name) {
                        case 'back':
                            const hostingContainer = document.getElementById('hosting-container');
                            if (hostingContainer)
                                hostingContainer.style.display = "block"; //Sparirà la tabella
                            hostingSegment.style.display = "none";
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
    openUI() {
        const hostingCard = document.getElementById("hosting-card");
        if (hostingCard)
            hostingCard.style.display = "block";
    }
    reloadUIs() {
        const websiteCard = document.getElementById("website-card");
        if (websiteCard)
            websiteCard.style.display = `none`;
        const websiteSegment = document.getElementById("website-segment");
        if (websiteSegment)
            websiteSegment.style.display = "none";
        this.webSiteUI.reloadUIs();
    }
}
