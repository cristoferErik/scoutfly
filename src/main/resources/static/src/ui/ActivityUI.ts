import { Activity, ActivityFilters, EnumCategoria, EnumStatus } from "../app/models/Activity.js";
import { ActivityService } from "../app/services/ActivityService.js";


export class ActivityUI {
    private activityService: ActivityService;
    private webSiteId:number;
    constructor(webSiteId:number) {
        this.webSiteId=webSiteId;
        this.activityService = new ActivityService();
    }
    async renderActivities() {
        let activityFilters: ActivityFilters = new ActivityFilters();
        const body = document.getElementById("body");
        if(!body) return;
        const activityCard= document.createElement("div");
        activityCard.id="activity-card";
        activityCard.className="card";
        activityCard.innerHTML=
            `
                <div id="activity-container">
                    <div class="container-bigTittle">
                        <p>Attivita</p>
                    </div>
                    <div class="container-parameters">
                        <p>Parametri di ricerca</p>
                    </div>
                    <div class="table-container"></div>
                    <div class="button-container mg-y-1">
                        <button class="button bt-green" name="inserire" type="button">Inserire</button>
                    </div>
                </div>
            `;
        body.appendChild(activityCard);
        const tableContainer = activityCard.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML=``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const activities = await this.activityService.getAllActivities(this.webSiteId,activityFilters);
        if (activities.length > 0) {
            console.log(activities.length);
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
                const body = document.createElement('tbody');
                body.classList.add('tbody');
                {
                    /*-------------------------ROW------------------------------ */
                    activities.forEach((activity) => {
                        const row = document.createElement('tr');
                        row.innerHTML =
                            `
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
        this.addModalInsertActivity();
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerActivityButton(): void {
        const element = document.getElementById("activity-container");
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
                    default:
                        console.log("Azione sconosciuta!");
                        break;
                }
            });
        });
    }
    /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
    addModalInsertActivity(){
        let activityCard=document.getElementById("activity-card");
        let buttons=activityCard?.querySelectorAll('[name]');
        buttons?.forEach((button) => {
            let btn = button as HTMLInputElement;
            if(btn.name=='inserire'){
                btn.addEventListener('click',() => {
                    this.modalInsertActivity();
                });
            }
        });
    }
    modalInsertActivity(){
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
                    <div class="item">
                        <label for="categoria">categoria</label>
                        <select class="dropdown" name="categoria" id="categoria">
                           
                        </select>
                    </div>
                    <div class="item">
                        <label for="status">status</label>
                        <select class="dropdown" name="status" id="status">
                        </select>
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
                <div class="button-container mg-y-1">
                    <button class="button bt-green" name="inserire" type="button">Inserire</button>
                </div>
            </div>
        `;
        modal.innerHTML=contenuto;
        this.filldropdownActivity();
    }
    filldropdownActivity(){
        let categoria= document.getElementById("categoria");
        let status=document.getElementById("status");

        if(!categoria) return;
        if(!status) return;

        const enumCategoria=Object.keys(EnumCategoria);
        const enumStatus=Object.keys(EnumStatus);

        enumCategoria.forEach((value)=>{
            categoria.innerHTML+=
            `
                <option value="${value}">${value}</option>
            `;
        });
        enumStatus.forEach((value)=>{
            status.innerHTML+=
            `
                <option value="${value}">${value}</option>
            `;
        });
    }
    reloadUIs(){
        document.getElementById('activity-card')?.remove();
        this.renderActivities();
    }
}
