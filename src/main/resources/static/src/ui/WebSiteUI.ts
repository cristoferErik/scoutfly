import { Hosting } from "../app/models/Hosting.js";
import { WebSite } from "../app/models/WebSite.js";
import { WebSiteService } from "../app/services/WebSiteService.js";
import { Pagination } from "../modules/Pagination.js";
import { addSelectRowOfTable } from "../utils/Tools.js";

export class WebSiteUI {
    private webSiteService: WebSiteService;
    private hostingId: number;
    constructor(hostingId: number) {
        this.webSiteService = new WebSiteService();
        this.hostingId = hostingId;
    }
    async renderWebSites() {
        const body = document.getElementById("body");
        if (!body) return;
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

        await this.renderTableWebSites(null);
        this.addModalInsertWebSite();
    }
    async renderTableWebSites(parameters: string | null) {
        const webSiteCard = document.getElementById("website-card");
        if (!webSiteCard) return;
        const tableContainer = webSiteCard.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML = ``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const websites = await this.webSiteService.getAllWebSitesByHosting(this.hostingId, parameters);
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
                                <th>data aggiornamento</th>
                                <th>data Backup</th>
                                <th>descrizione</th>
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
                                          <button class="button bt-red" name="elimina" type="button" value="${website.id}">Elimina</button>
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
        addSelectRowOfTable();
    }
    addPagination() {
        let linkPages = this.webSiteService.pageLinks;
        if (!linkPages) return;
        let webSiteContainer = document.getElementById("website-container");
        if (!webSiteContainer) return;
        Pagination(linkPages, webSiteContainer);
        this.addEventListenerToPagination(webSiteContainer);
       
    }
    addEventListenerToPagination(activityContainer: HTMLElement) {
        let activeLinks = activityContainer.querySelectorAll(".active");
        activeLinks.forEach((link) => {
            link.addEventListener("click", () => {
                const value = link.getAttribute("value");
                this.renderTableWebSites(value);
            });
        });
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton(): void {
        const element = document.getElementById("website-container");
        if (!element) return;
        const tableContainer = element.querySelector(".table-container");
        if (!tableContainer) return;
        const buttonContainers = tableContainer.querySelectorAll(".button-container");
        buttonContainers.forEach((buttonContainer) => {
            buttonContainer?.addEventListener("click", (event) => {
                const target = event?.target as HTMLElement;
                const button = target?.closest("button");
                if (!button) return;
                switch (button.name) {
                    case "vedi":
                        this.modalInsertWebSite();
                        this.updateModalWebSite(parseInt(button.value));
                        break;
                    case "elimina":
                        this.modalDeleteClient(parseInt(button.value));
                        break;
                    case "seleziona":
                        console.log("seleziona");
                        let websiteId: number | null;
                        if (button?.value) {
                            websiteId = parseInt(button?.value);
                            let website: WebSite | undefined = this.webSiteService.websites.find(
                                (website) => website.id === websiteId
                            );
                            if (website) {
                                document.getElementById("website-card")?.remove();
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
    segmentWebSite(website: WebSite): void {
        const body = document.getElementById("body");
        if (!body) return;
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
                            this.removeUIs();
                            this.renderWebSites();
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
    addModalInsertWebSite() {
        let hostingCard = document.getElementById("website-card");
        let buttons = hostingCard?.querySelectorAll('[name]');
        buttons?.forEach((button) => {
            let btn = button as HTMLInputElement;
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
        modal?.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                modal.innerHTML = ``;
            }
        });
        if (!modal) return;
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
    updateModalWebSite(id: number) {
        let website: WebSite | undefined = this.webSiteService.websites.find(
            (website) => website.id === id
        );
        if (!website) return;
        let form = document.getElementById("webSiteForm") as HTMLFormElement;
        if (!form) return;
        let inputs = form.querySelectorAll("[name]");
        if (!inputs || inputs.length == 0) return;
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
        let webSiteForm = document.getElementById("webSiteForm") as HTMLFormElement;
        let buttonContainer = webSiteForm.querySelector(".button-container");
        if (!buttonContainer) return;
        let buttons = buttonContainer.querySelectorAll(".button");
        buttons.forEach(button => {
            let btn = button as HTMLButtonElement;
            btn.addEventListener('click', async () => {
                switch (btn.name) {
                    case 'salva':
                        await this.salvaWebSite();
                        this.closeModal();
                        this.renderTableWebSites(null);
                        break;
                }
            });
        });
    }
    async salvaWebSite() {
        let webSiteForm = document.getElementById("webSiteForm") as HTMLFormElement;
        let webSite: WebSite = new WebSite();
        const formData = new FormData(webSiteForm);
        const id = Number(formData.get('webSiteId'));
        webSite.id = id == 0 ? undefined : id;
        webSite.nome = formData.get('nome') as string;
        webSite.url = formData.get('url') as string;
        webSite.dataAggiornamento = new Date(formData.get('dataAggiornamento') as string);
        webSite.dataBackup = new Date(formData.get('dataBackup') as string);
        webSite.descrizione = formData.get('descrizione') as string;
        let hosting = new Hosting();
        hosting.id = this.hostingId;
        webSite.hosting = hosting;

        let message = await this.webSiteService.saveWebSite(webSite);
        return message;
    }
    modalDeleteClient(webSiteId:number){
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
                    <p>Sei Sicuro di voler eliminare?</p>
                </div>
                <div class="button-container mg-y-1">
                    <button class="button bt-red" name="elimina" type="button" value="${webSiteId}">Elimina</button>
                    <button class="button bt-green" name="cancella" type="button">Cancella</button>
                </div>
            </div>
        `;
        modal.innerHTML=contenuto;
        this.addEventListenerDeleteClient();
    }
    addEventListenerDeleteClient(){
        let modal=document.getElementById('modal');
        if(!modal)return;
        let buttons=modal.querySelectorAll(".button");
        buttons.forEach((button)=>{
            let btn =button as HTMLButtonElement;
            button.addEventListener('click',async()=>{
                switch(btn.name){
                    case 'elimina':
                        await this.webSiteService.deleteWebSite(parseInt(btn.value));
                        this.closeModal();
                        this.renderTableWebSites(null);
                        break;
                    case 'cancella':
                        this.closeModal();
                        this.renderTableWebSites(null);
                        break;
                    default:
                        break; 
                }
            });
        });
    }

    removeUIs() {
        document.getElementById('website-card')?.remove();
    }
    closeModal() {
        let modal = document.getElementById('modal');
        if (!modal) return;
        modal.style.display = "none";
        modal.innerHTML = ``;
    }
}
