import { Activity, ActivityFilters } from "../app/models/Activity.js";
import { ActivityService } from "../app/services/ActivityService.js";


export class ActivityUI {
    private activityService: ActivityService;
    constructor() {
        this.activityService = new ActivityService();
    }
    async renderActivities(activityFilters: ActivityFilters) {
        this.openUI();
        const activityContainer = document.getElementById("activity-container");
        if (!activityContainer) return;
        activityContainer.style.display=`block`;
        const tableContainer = activityContainer.querySelector(".table-container");
        if (!tableContainer) return;
        tableContainer.innerHTML=``;

        //Se aggiungiamo await aspettara che finisca per poter continuare
        const activities = await this.activityService.getAllActivities(activityFilters);
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
    }
    //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
    addEventListenerActivityButton(): void {
        const element = document.getElementById("activity-container");
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
                    default:
                        console.log("Azione sconosciuta!");
                        break;
                }
            });
        });
    }
    openUI(){
        const websiteCard=document.getElementById("activity-card");
        if(websiteCard) websiteCard.style.display="block";
    }

}
