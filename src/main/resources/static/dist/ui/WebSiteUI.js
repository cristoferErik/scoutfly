var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Hosting } from "../app/models/Hosting.js";
import { WebSite } from "../app/models/WebSite.js";
import { WebSiteService } from "../app/services/WebSiteService.js";
import { Pagination } from "../modules/Pagination.js";
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
                <div class="pagination"></div>
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
            body.appendChild(websiteCard);
            yield this.renderTableWebSites(null);
            this.addModalInsertWebSite();
        });
    }
    renderTableWebSites(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const webSiteCard = document.getElementById("website-card");
            if (!webSiteCard)
                return;
            const tableContainer = webSiteCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const websites = yield this.webSiteService.getAllWebSitesByHosting(this.hostingId, parameters);
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
                                <th>dataCreazione</th>
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
            this.addPagination();
        });
    }
    addPagination() {
        let linkPages = this.webSiteService.pageLinks;
        if (!linkPages)
            return;
        let webSiteContainer = document.getElementById("website-container");
        if (!webSiteContainer)
            return;
        Pagination(linkPages, webSiteContainer);
        this.addEventListenerToPagination(webSiteContainer);
    }
    addEventListenerToPagination(activityContainer) {
        let activeLinks = activityContainer.querySelectorAll(".active");
        activeLinks.forEach((link) => {
            link.addEventListener("click", () => {
                const value = link.getAttribute("value");
                this.renderTableWebSites(value);
            });
        });
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
            <form class="card-modal" id="webSiteForm">
                <div class="container-bigTittle">
                    <p>Nuovo WebSite</p>
                    <input type="hidden" name="webSiteId">
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
                    <button class="button bt-green" name="salva" type="button">Inserire</button>
                </div>
            </form>
        `;
        modal.innerHTML = contenuto;
        this.eventoSalvaWebSite();
    }
    updateModalWebSite(id) {
        let website = this.webSiteService.websites.find((website) => website.id === id);
        if (!website)
            return;
        let form = document.getElementById("webSiteForm");
        if (!form)
            return;
        let inputs = form.querySelectorAll("[name]");
        if (!inputs || inputs.length == 0)
            return;
        inputs.forEach(function (input) {
            if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                switch (input.name) {
                    case 'webSiteId':
                        if (website.id !== undefined) {
                            input.value = website.id.toString();
                        }
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
    eventoSalvaWebSite() {
        let webSiteForm = document.getElementById("webSiteForm");
        let buttonContainer = webSiteForm.querySelector(".button-container");
        if (!buttonContainer)
            return;
        let buttons = buttonContainer.querySelectorAll(".button");
        buttons.forEach(button => {
            let btn = button;
            btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                switch (btn.name) {
                    case 'salva':
                        yield this.salvaWebSite();
                        this.closeModal();
                        this.renderTableWebSites(null);
                        break;
                }
            }));
        });
    }
    salvaWebSite() {
        return __awaiter(this, void 0, void 0, function* () {
            let webSiteForm = document.getElementById("webSiteForm");
            let webSite = new WebSite();
            const formData = new FormData(webSiteForm);
            const id = Number(formData.get('webSiteId'));
            webSite.id = id == 0 ? undefined : id;
            webSite.nome = formData.get('nome');
            webSite.url = formData.get('url');
            webSite.dataAggiornamento = new Date(formData.get('dataAggiornamento'));
            webSite.dataBackup = new Date(formData.get('dataBackup'));
            webSite.descrizione = formData.get('descrizione');
            let hosting = new Hosting();
            hosting.id = this.hostingId;
            webSite.hosting = hosting;
            let message = yield this.webSiteService.saveWebSite(webSite);
            return message;
        });
    }
    removeUIs() {
        var _a;
        (_a = document.getElementById('website-card')) === null || _a === void 0 ? void 0 : _a.remove();
    }
    closeModal() {
        let modal = document.getElementById('modal');
        if (!modal)
            return;
        modal.style.display = "none";
        modal.innerHTML = ``;
    }
}
