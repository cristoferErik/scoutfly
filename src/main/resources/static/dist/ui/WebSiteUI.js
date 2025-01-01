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
export class WebSiteUI {
    constructor(hostingId) {
        this.webSiteService = new WebSiteService();
        this.hostingId = hostingId;
    }
    renderWebSites() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = document.getElementById("body");
            if (!body)
                return;
            const websiteCard = document.createElement("div");
            websiteCard.id = "website-card";
            websiteCard.className = "card";
            websiteCard.innerHTML =
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
            yield this.renderTableWebSites();
            this.addModalInsertWebSite();
        });
    }
    renderTableWebSites() {
        return __awaiter(this, void 0, void 0, function* () {
            const webSiteCard = document.getElementById("website-card");
            if (!webSiteCard)
                return;
            const tableContainer = webSiteCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const websites = yield this.webSiteService.getAllWebSitesByHosting(this.hostingId);
            if (websites.length > 0) {
                //console.log(websites.length);
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
                                        <button type="button" name="vedi" class="button bt-green" value="${website.id}">vedi</button>
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
            this.addEventListenerWebSiteButton();
        });
    }
    addPagination() {
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton() {
        const element = document.getElementById("website-container");
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
                        this.modalInsertWebSite();
                        this.updateModalWebSite(parseInt(button.value));
                        break;
                    case "elimina":
                        console.log("elimina");
                        break;
                    case "seleziona":
                        console.log("seleziona");
                        let websiteId;
                        if (button === null || button === void 0 ? void 0 : button.value) {
                            websiteId = parseInt(button === null || button === void 0 ? void 0 : button.value);
                            let website = this.webSiteService.websites.find((website) => website.id === websiteId);
                            if (website) {
                                (_a = document.getElementById("website-card")) === null || _a === void 0 ? void 0 : _a.remove();
                                this.segmentWebSite(website);
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
        const body = document.getElementById("body");
        if (!body)
            return;
        const websiteCard = document.createElement("div");
        websiteCard.id = "website-card";
        websiteCard.className = "card";
        websiteCard.innerHTML =
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
                            <input type="hidden" id="websiteId" value="${website.id}">
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
                            this.removeUIs();
                            this.renderWebSites();
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
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertWebSite() {
        let hostingCard = document.getElementById("website-card");
        let buttons = hostingCard === null || hostingCard === void 0 ? void 0 : hostingCard.querySelectorAll('[name]');
        buttons === null || buttons === void 0 ? void 0 : buttons.forEach((button) => {
            let btn = button;
            if (btn.name == 'inserire') {
                btn.addEventListener('click', () => {
                    this.modalInsertWebSite();
                });
            }
        });
    }
    modalInsertWebSite() {
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
            <div class="card-modal" id="websiteForm">
                <div class="container-bigTittle">
                    <p>Nuovo WebSite</p>
                    <input type="hidden" name="Id">
                </div>
                <div class="items">
                    <div class="item">
                        <label for="nome">nome</label>
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
        modal.innerHTML = contenuto;
    }
    updateModalWebSite(id) {
        let website = this.webSiteService.websites.find((website) => website.id === id);
        if (!website)
            return;
        let form = document.getElementById("websiteForm");
        if (!form)
            return;
        let inputs = form.querySelectorAll("[name]");
        if (!inputs || inputs.length == 0)
            return;
        inputs.forEach(function (input) {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                switch (input.name) {
                    case 'Id':
                        input.value = website.id.toString();
                        break;
                    case 'nome':
                        input.value = website.nome;
                        break;
                    case 'url':
                        input.value = website.url;
                        break;
                    case 'descrizione':
                        input.value = website.descrizione;
                        break;
                    case 'dataAggiornamento':
                        input.value = website.dataAggiornamento.toString();
                        break;
                    case 'dataBackup':
                        input.value = website.dataBackup.toString();
                        break;
                    default:
                        break;
                }
            }
        });
    }
    removeUIs() {
        var _a;
        (_a = document.getElementById('website-card')) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
