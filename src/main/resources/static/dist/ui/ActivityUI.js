var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { GET_ACTIVITIES } from "../api/endpoints.js";
import { EnumCategoria, EnumStatus } from "../app/models/Activity.js";
import { ActivityService } from "../app/services/ActivityService.js";
import { Pagination } from "../modules/Pagination.js";
export class ActivityUI {
    constructor(clientId) {
        this.clientId = clientId !== null && clientId !== void 0 ? clientId : 0; //Si client è undefined assegniamo 0
        this.activityService = new ActivityService();
    }
    renderActivitiesByClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = document.getElementById("body");
            if (!body)
                return;
            const activityCard = document.createElement("div");
            activityCard.id = "activity-card";
            activityCard.className = "card";
            activityCard.innerHTML = `
                <div id="activity-container">
                    <div class="container-bigTittle">
                        <p>Attivita</p>
                    </div>
                    <div class="parameters"></div>
                    <div class="table-container"></div>
                    <div class="pagination"></div>
                    <div class="button-container mg-y-1">
                        <button class="button bt-green" name="inserire" type="button">Inserire</button>
                    </div>
                </div>
            `;
            body.appendChild(activityCard);
            this.addFieldParameters();
            this.renderTableActivityByClient(null);
            this.addModalInsertActivity();
        });
    }
    renderTableActivityByClient(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityCard = document.getElementById("activity-card");
            if (!activityCard)
                return;
            const tableContainer = activityCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const activities = yield this.activityService.getAllActivitiesByClient(this.clientId, parameters);
            if (activities.length > 0) {
                //console.log(activities.length);
                /*------------------------TABLE------------------------------- */
                const table = document.createElement("table");
                table.classList.add("table");
                table.setAttribute("border", "1");
                {
                    /*------------------------HEADER------------------------------- */
                    const header = document.createElement("thead");
                    header.classList.add("theader");
                    header.innerHTML = `       <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>descrizione</th>
                                <th>categoria</th>
                                <th>status</th>
                                <th>durata</th>
                                <th>prezzo</th>
                                <th>totale</th>
                                <th>dataLimite</th>
                                <th>dataCreazione</th>
                                <th>dataModifica</th>
                                <th>action</th>
                            </tr>
                                
                    `;
                    /*------------------------HEADER------------------------------- */
                    /*-------------------------BODY-------------------------------- */
                    const body = document.createElement("tbody");
                    body.classList.add("tbody");
                    {
                        /*-------------------------ROW------------------------------ */
                        activities.forEach((activity) => {
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${activity.id}</td>
                                <td>${activity.nome}</td>
                                <td>${activity.descrizione}</td>
                                <td>${activity.categoria}</td>
                                <td>${activity.status}</td>
                                <td>${activity.durataOre}</td>
                                <td>${activity.prezzo}</td>
                                <td>${activity.prezzoTotale}</td>
                                <td>${activity.dataLimite}</td>
                                <td>${activity.createAt}</td>
                                <td>${activity.updateAt}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red">elimina</button>
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
            this.addEventListenerActivityButton();
            this.addPagination();
        });
    }
    addFieldParameters() {
        let clientCard = document.getElementById("activity-card");
        if (!clientCard)
            return;
        let parameters = clientCard.querySelector(".parameters");
        if (!parameters)
            return;
        parameters.innerHTML = `
            <div class="container">
                <div class="items">
                    <div class="item">
                        <p>Data Iniziale</p>
                        <input type="date" name="dataIniziale">
                    </div>
                    <div class="item">
                        <p for="dataFinale">Data Fine</p>
                        <input type="date" name="dataFinale">
                    </div>
                </div>
                <div class="items">
                    <div class="dropdowns">
                        <div class="item">
                            <p for="categoria">categoria</p>
                            <select class="dropdown" name="categoria">  
                            </select>
                        </div>
                        <div class="item">
                            <p for="status">status</p>
                            <select class="dropdown" name="status">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="button-container">
                    <button class="button" type="button">Cerca</button>
                </div>
            </div>
        `;
        this.filldropdownActivity();
        this.addEventListenerToParameter();
    }
    addEventListenerToParameter() {
        var _a;
        let activityCard = document.getElementById("activity-card");
        if (!activityCard)
            return;
        let parameters = activityCard.querySelector(".parameters");
        if (!parameters)
            return;
        let buttonContainer = parameters.querySelector(".button-container");
        if (!buttonContainer)
            return;
        (_a = buttonContainer.querySelector(".button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let inputs = parameters.querySelectorAll("[name]");
            let params = {};
            inputs.forEach((input) => {
                let element = input;
                switch (element.name) {
                    case "categoria":
                        params["categoria"] = element.value.trim();
                        break;
                    case "status":
                        params["status"] = element.value.trim();
                        break;
                    case "dataIniziale":
                        params["dataIniziale"] = element.value.trim();
                        break;
                    case "dataFinale":
                        params["dataFinale"] = element.value.trim();
                        break;
                    default:
                        break;
                }
            });
            let url = `${GET_ACTIVITIES}/${this.clientId}`;
            let paramString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join("&");
            if (paramString)
                url += "?" + paramString;
            //console.log(url);
            this.renderTableActivityByClient(url.toString());
        });
    }
    addPagination() {
        let linkPages = this.activityService.pageLinks;
        if (!linkPages)
            return;
        let activityContainer = document.getElementById("activity-container");
        if (!activityContainer)
            return;
        Pagination(linkPages, activityContainer);
        this.addEventListenerToPagination(activityContainer);
    }
    addEventListenerToPagination(activityContainer) {
        let activeLinks = activityContainer.querySelectorAll(".active");
        activeLinks.forEach((link) => {
            link.addEventListener("click", () => {
                const value = link.getAttribute("value");
                //console.log(value);
                this.renderTableActivityByClient(value);
            });
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerActivityButton() {
        const element = document.getElementById("activity-container");
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
                    default:
                        console.log("Azione sconosciuta!");
                        break;
                }
            });
        });
    }
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertActivity() {
        let activityCard = document.getElementById("activity-card");
        let buttons = activityCard === null || activityCard === void 0 ? void 0 : activityCard.querySelectorAll("[name]");
        buttons === null || buttons === void 0 ? void 0 : buttons.forEach((button) => {
            let btn = button;
            if (btn.name == "inserire") {
                btn.addEventListener("click", () => {
                    this.modalInsertActivity();
                });
            }
        });
    }
    modalInsertActivity() {
        let modal = document.getElementById("modal");
        /*In caso fai clic fuori del modal, si chiudera */
        modal === null || modal === void 0 ? void 0 : modal.addEventListener("click", (event) => {
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
                    <p>Nuova Attività</p>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="">Nome</label>
                        <input name="Nome" type="text">
                    </div>
                    <div class="item"> 
                        <label for="descrizione">Descrizione</label>
                        <input name="descrizione" type="text">
                    </div>
                </div>
                <div class="items">
                    <div class="dropdowns">
                        <div class="item">
                            <p for="categoria">categoria</p>
                            <select class="dropdown" name="categoria">  
                            </select>
                        </div>
                        <div class="item">
                            <p for="status">status</p>
                            <select class="dropdown" name="status">
                            </select>
                        </div>
                    </div>
                </div>
                <div class="items">
                    <div class="item">
                        <label for="dataLimite">dataLimite</label>
                        <input name="dataLimite" type="Date">
                    </div>
                    <div class="item">
                        <label for="durataOre">durataOre</label>
                        <input name="durataOre" type="number">
                    </div>
                    <div class="item">
                        <label for="prezzo">prezzo</label>
                        <input name="prezzo" type="number">
                    </div>
                </div>
                <div class="button-container">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        modal.innerHTML = contenuto;
        this.filldropdownActivity();
    }
    filldropdownActivity() {
        let dropdowns = document.querySelectorAll(".dropdown");
        dropdowns.forEach((dropdown) => {
            dropdown.innerHTML = ``;
            let element = dropdown;
            switch (element.name) {
                case "categoria":
                    const enumCategoria = Object.keys(EnumCategoria);
                    enumCategoria.forEach((value) => {
                        element.innerHTML += `
                            <option value="${value}">${value}</option>
                        `;
                    });
                    break;
                case "status":
                    const enumStatus = Object.keys(EnumStatus);
                    enumStatus.forEach((value) => {
                        element.innerHTML += `
                            <option value="${value}">${value}</option>
                        `;
                    });
                    break;
            }
        });
    }
    /*Questi funzione vengono utilizati nella finestra activities! */
    renderActivities() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = document.getElementById("body");
            if (!body)
                return;
            const activityCard = document.createElement("div");
            activityCard.id = "activity-card";
            activityCard.className = "card";
            activityCard.innerHTML = `
                <div id="activity-container">
                    <div class="container-bigTittle">
                        <p>Attivita</p>
                    </div>
                    <div class="parameters"></div>
                    <div class="table-container"></div>
                    <div class="pagination"></div>
                    <div class="button-container mg-y-1">
                        <button class="button bt-green" name="inserire" type="button">Inserire</button>
                    </div>
                </div>
            `;
            body.appendChild(activityCard);
            this.addFieldActivitiesParameters();
            this.renderTableActivities(null);
            this.addModalInsertActivity();
        });
    }
    renderTableActivities(parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const activityCard = document.getElementById("activity-card");
            if (!activityCard)
                return;
            const tableContainer = activityCard.querySelector(".table-container");
            if (!tableContainer)
                return;
            tableContainer.innerHTML = ``;
            //Se aggiungiamo await aspettara che finisca per poter continuare
            const activities = yield this.activityService.getAllActivities(parameters);
            if (activities.length > 0) {
                //console.log(activities.length);
                /*------------------------TABLE------------------------------- */
                const table = document.createElement("table");
                table.classList.add("table");
                table.setAttribute("border", "1");
                {
                    /*------------------------HEADER------------------------------- */
                    const header = document.createElement("thead");
                    header.classList.add("theader");
                    header.innerHTML = `       <tr>
                                <th>Id</th>
                                <th>Nome della attività</th>
                                <th>descrizione</th>
                                <th>categoria</th>
                                <th>status</th>
                                <th>durata</th>
                                <th>prezzo</th>
                                <th>totale</th>
                                <th>dataLimite</th>
                                <th>nome cliente</th>
                                <th>dataCreazione</th>
                                <th>dataModifica</th>
                                <th>action</th>
                            </tr>
                                
                    `;
                    /*------------------------HEADER------------------------------- */
                    /*-------------------------BODY-------------------------------- */
                    const body = document.createElement("tbody");
                    body.classList.add("tbody");
                    {
                        /*-------------------------ROW------------------------------ */
                        activities.forEach((activity) => {
                            var _a, _b;
                            const row = document.createElement("tr");
                            row.innerHTML = `
                                <td>${activity.id}</td>
                                <td>${activity.nome}</td>
                                <td>${activity.descrizione}</td>
                                <td>${activity.categoria}</td>
                                <td>${activity.status}</td>
                                <td>${activity.durataOre}</td>
                                <td>${activity.prezzo}</td>
                                <td>${activity.prezzoTotale}</td>
                                <td>${activity.dataLimite}</td>
                                <td>${(_a = activity.client) === null || _a === void 0 ? void 0 : _a.nome} ${(_b = activity.client) === null || _b === void 0 ? void 0 : _b.cognome}</td>
                                <td>${activity.createAt}</td>
                                <td>${activity.updateAt}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red">elimina</button>
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
            this.addEventListenerActivityButton();
            this.addPagination();
        });
    }
    addFieldActivitiesParameters() {
        let clientCard = document.getElementById("activity-card");
        if (!clientCard)
            return;
        let parameters = clientCard.querySelector(".parameters");
        if (!parameters)
            return;
        parameters.innerHTML = `
            <div class="container">
                <div class="items">
                    <div class="item">
                        <p>Data Iniziale</p>
                        <input type="date" name="dataIniziale">
                    </div>
                    <div class="item">
                        <p>Data Fine</p>
                        <input type="date" name="dataFinale">
                    </div>
                </div>
                <div class="items">
                    <div class="dropdowns">
                        <div class="item">
                            <p for="categoria">categoria</p>
                            <select class="dropdown" name="categoria">  
                            </select>
                        </div>
                        <div class="item">
                            <p for="status">status</p>
                            <select class="dropdown" name="status">
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="items">
                        <div class="item">
                            <p>Nome Cliente</p>
                            <input type="text" name="nomeCliente">
                        </div>
                        <div class="item">
                            <p>Cognome Cliente</p>
                            <input type="text" name="cognomeCliente">
                        </div>
                </div>
                <div class="button-container">
                    <button class="button" type="button">Cerca</button>
                </div>
            </div>
        `;
        this.filldropdownActivity();
        this.addEventListenerToParameterActivities();
    }
    addEventListenerToParameterActivities() {
        var _a;
        let activityCard = document.getElementById("activity-card");
        if (!activityCard)
            return;
        let parameters = activityCard.querySelector(".parameters");
        if (!parameters)
            return;
        let buttonContainer = parameters.querySelector(".button-container");
        if (!buttonContainer)
            return;
        (_a = buttonContainer.querySelector(".button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            let inputs = parameters.querySelectorAll("[name]");
            let params = {};
            inputs.forEach((input) => {
                let element = input;
                switch (element.name) {
                    case "categoria":
                        params["categoria"] = element.value.trim();
                        break;
                    case "status":
                        params["status"] = element.value.trim();
                        break;
                    case "dataIniziale":
                        params["dataIniziale"] = element.value.trim();
                        break;
                    case "dataFinale":
                        params["dataFinale"] = element.value.trim();
                        break;
                    case "nomeCliente":
                        params["nomeCliente"] = element.value.trim();
                        break;
                    case "cognomeCliente":
                        params["cognomeCliente"] = element.value.trim();
                        break;
                    default:
                        break;
                }
            });
            let url = `${GET_ACTIVITIES}`;
            let paramString = Object.keys(params)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
                .join("&");
            if (paramString)
                url += "?" + paramString;
            //console.log(url);
            this.renderTableActivities(url.toString());
        });
    }
    removeUIs() {
        var _a;
        (_a = document.getElementById("activity-card")) === null || _a === void 0 ? void 0 : _a.remove();
    }
}
