import { WebSite } from "../app/models/WebSite.js";
import { WebSiteService } from "../app/services/WebSiteService.js";

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
        
        await this.renderTableWebSites();
        this.addModalInsertWebSite();
    }
    async renderTableWebSites(){
        const webSiteCard=document.getElementById("website-card");
        if(!webSiteCard) return;
        const tableContainer = webSiteCard.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML=``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const websites = await this.webSiteService.getAllWebSitesByHosting(this.hostingId);
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
    }
    addPagination(){
        
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerWebSiteButton(): void {
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
                        this.modalInsertWebSite();
                        this.updateModalWebSite(parseInt(button.value));
                        break;
                    case "elimina":
                        console.log("elimina");
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
        modal.innerHTML=contenuto;
    }
    updateModalWebSite(id:number){
        let website: WebSite | undefined = this.webSiteService.websites.find(
                    (website) => website.id === id
                );
        if(!website) return;
        let form =document.getElementById("websiteForm") as HTMLFormElement;
        if(!form) return;
        let inputs = form.querySelectorAll("[name]");
        if(!inputs || inputs.length==0) return;
        inputs.forEach(function(input){
            if(input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement ){
                switch(input.name){
                    case 'Id':
                        input.value=website.id.toString();
                        break;
                    case 'nome':
                        input.value=website.nome;
                        break;
                    case 'url':
                        input.value=website.url;
                        break;
                    case 'descrizione':
                        input.value=website.descrizione;
                        break;
                    case 'dataAggiornamento':
                        input.value=website.dataAggiornamento.toString();
                        break;
                    case 'dataBackup':
                        input.value=website.dataBackup.toString();
                        break;
                    default:
                        break;
                }
            }
        });
    }
    removeUIs(){
        document.getElementById('website-card')?.remove();
    }
}
