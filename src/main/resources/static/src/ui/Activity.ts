import { GET_ACTIVITIES_CLIENT } from "../api/endpoints.js";
import { Activity, EnumCategoria, EnumStatus } from "../app/models/Activity.js";
import { ActivityService } from "../app/services/ActivityService.js";
import { Pagination } from "../modules/Pagination.js";
import { addSelectRowOfTable } from "../utils/Tools.js";

export class ActivityUI {
  private activityService: ActivityService;
  constructor() {
    this.activityService = new ActivityService();
  }

  async renderActivities() {
    const body = document.getElementById("body");
    if (!body) return;
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
                </div>
            `;
    body.appendChild(activityCard);
    this.addFieldActivitiesParameters();
    this.renderTableActivities(null);
    this.addModalInsertActivity();
  }

  async renderTableActivities(parameters: string | null) {
    const activityCard = document.getElementById("activity-card");
    if (!activityCard) return;
    const tableContainer = activityCard.querySelector(".table-container");
    if (!tableContainer) return;
    tableContainer.innerHTML = ``;

    //Se aggiungiamo await aspettara che finisca per poter continuare
    const activities = await this.activityService.getAllActivities(parameters);
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
                                <td>${activity.client?.nome} ${activity.client?.cognome}</td>
                                <td>${activity.createAt}</td>
                                <td>${activity.updateAt}</td>
                                <td>
                                    <div class="button-container">
                                        <button type="button" name="vedi" class="button bt-green" value="${activity.id}">vedi</button>
                                        <button type="button" name="elimina" class="button bt-red" value="${activity.id}">elimina</button>
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
    addSelectRowOfTable();
  }
  addPagination() {
    let linkPages = this.activityService.pageLinks;
    if (!linkPages) return;
    let activityContainer = document.getElementById("activity-container");
    if (!activityContainer) return;
    Pagination(linkPages, activityContainer);
    this.addEventListenerToPagination(activityContainer);
  }
  addEventListenerToPagination(activityContainer: HTMLElement) {
    let activeLinks = activityContainer.querySelectorAll(".active");
    activeLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const value = link.getAttribute("value");
        //console.log(value);
        this.renderTableActivities(value);
      });
    });
  }
  //Aggiunge un'evento click ai buttoni che sono dentro della tabella renderClients
  addEventListenerActivityButton(): void {
    const element = document.getElementById("activity-container");
    if (!element) return;
    const tableContainer = element.querySelector(".table-container");
    if (!tableContainer) return;
    const buttonContainers =
      tableContainer.querySelectorAll(".button-container");
    buttonContainers.forEach((buttonContainer) => {
      buttonContainer?.addEventListener("click", (event) => {
        const target = event?.target as HTMLElement;
        const button = target?.closest("button");
        if (!button) return;
        switch (button.name) {
          case "vedi":
            this.modalInsertActivity();
            this.updateModalActivity(parseInt(button.value));
            break;
          case "elimina":
            this.modalDeleteActivity(parseInt(button.value));
            break;
          default:
            console.log("Azione sconosciuta!");
            break;
        }
      });
    });
  }
  addFieldActivitiesParameters() {
    let clientCard = document.getElementById("activity-card");
    if (!clientCard) return;
    let parameters = clientCard.querySelector(".parameters");
    if (!parameters) return;
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
                            <p>Nome Attività</p>
                            <input type="text" name="nomeAttivita">
                        </div>
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
    let activityCard = document.getElementById("activity-card");
    if (!activityCard) return;
    let parameters = activityCard.querySelector(".parameters");
    if (!parameters) return;
    let buttonContainer = parameters.querySelector(".button-container");
    if (!buttonContainer) return;
    buttonContainer.querySelector(".button")?.addEventListener("click", () => {
      let inputs = parameters.querySelectorAll("[name]");
      let params: {
        [key: string]: string;
      } = {};
      inputs.forEach((input) => {
        let element = input as HTMLInputElement;
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
          case "nomeAttivita":
            params["nomeAttivita"] = element.value.trim();
            break;
          default:
            break;
        }
      });
      let url = `${GET_ACTIVITIES_CLIENT}`;

      let paramString = Object.keys(params)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        )
        .join("&");

      if (paramString) url += "?" + paramString;

      //console.log(url);
      this.renderTableActivities(url.toString());
    });
  }
  /*Questo buttone ti permette aprire il modale per inserire un nuovo Cliente! */
  addModalInsertActivity() {
    let activityCard = document.getElementById("activity-card");
    let buttons = activityCard?.querySelectorAll("[name]");
    buttons?.forEach((button) => {
      let btn = button as HTMLInputElement;
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
    modal?.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        modal.innerHTML = ``;
      }
    });
    if (!modal) return;
    modal.style.display = "flex";
    modal.innerHTML = ``;
    let contenuto = `
              <form class="card-modal" id="activityForm">
                  <div class="container-bigTittle">
                      <p>Nuova Attività</p>
                      <input type="hidden" name="activityId">
                  </div>
                  <div class="items">
                      <div class="item">
                          <p>Nome</p>
                          <input name="nome" type="text">
                      </div>
                  </div>
                  <div class="items">
                      <div class="dropdowns">
                          <div class="item">
                              <p>categoria</p>
                              <select class="dropdown" name="categoria">  
                              </select>
                          </div>
                          <div class="item">
                              <p>status</p>
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
                  <div class="items">
                    <div class="text-container">
                      <label>descrizione</label>
                      <textarea name="descrizione" type="text"></textarea>
                    </div>
                  </div>
                  <div class="button-container">
                      <button class="button bt-green" name="salva" type="button">salva</button>
                  </div>
              </form>
          `;
    modal.innerHTML = contenuto;
    this.filldropdownActivity();
    this.eventoSalvaActivity();
  }
  updateModalActivity(id: number) {

    let activity: Activity | undefined = this.activityService.activities.find(
      (activity) => activity.id === id
    );
    if (!activity) return;
    let form = document.getElementById("activityForm") as HTMLFormElement;
    let inputs = form.querySelectorAll("[name]");
    if (!inputs || inputs.length == 0) return;
    inputs.forEach(function (input) {
      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLTextAreaElement ||
        input instanceof HTMLSelectElement
      ) {
        switch (input.name) {
          case 'activityId':
            if (activity.id !== undefined) {
              input.value = activity.id.toString();
            }
            break;
          case 'nome':
            input.value = activity.nome;
            break;
          case 'categoria':
            input.value = activity.categoria;
            break;
          case 'status':
            input.value = activity.status;
            break;
          case 'dataLimite':
            input.value = activity.dataLimite.toString();
            break;
          case 'durataOre':
            input.value = activity.durataOre.toString();
            break;
          case 'prezzo':
            input.value = activity.prezzo.toString();
            break;
          case 'descrizione':
            input.value = activity.descrizione;
            break;
          default:
            break;
        }
      }
    });
  }
  eventoSalvaActivity() {
    let activityForm = document.getElementById("activityForm") as HTMLFormElement;
    let buttonContainer = activityForm.querySelector(".button-container");
    if (!buttonContainer) return;
    let buttons = buttonContainer.querySelectorAll(".button");
    buttons.forEach(button => {
      let btn = button as HTMLButtonElement;
      btn.addEventListener('click', async () => {
        switch (btn.name) {
          case 'salva':
              await this.salvaActivity();
              this.closeModal();
              this.renderTableActivities(null);
            break;
          default:
            break;
        }
      });
    });
  }
  async salvaActivity() {
    let activityForm = document.getElementById("activityForm") as HTMLFormElement;
    let activity: Activity = new Activity();
    const formData = new FormData(activityForm);
    const id = Number(formData.get('activityId'));
    activity.id = id == 0 ? undefined : id;
    activity.nome = formData.get('nome') as string;
    activity.prezzo = Number(formData.get('prezzo') as string);
    activity.categoria = formData.get('categoria') as EnumCategoria;
    activity.status = formData.get('status') as EnumStatus;
    activity.dataLimite = new Date(formData.get('dataLimite') as string);
    activity.durataOre = Number(formData.get('durataOre') as string);
    activity.descrizione = formData.get('descrizione') as string;

    let message: string = await this.activityService.fetchSaveActivityService(activity);
    return message;
  }

  filldropdownActivity() {
    let dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach((dropdown) => {
      dropdown.innerHTML = ``;
      let element = dropdown as HTMLSelectElement;
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
  modalDeleteActivity(activityId:number){
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
                  <button class="button bt-red" name="elimina" type="button" value="${activityId}">Elimina</button>
                  <button class="button bt-green" name="cancella" type="button">Cancella</button>
              </div>
          </div>
      `;
      modal.innerHTML=contenuto;
      this.addEventListenerDeleteActivity();
  }
  addEventListenerDeleteActivity(){
      let modal=document.getElementById('modal');
      if(!modal)return;
      let buttons=modal.querySelectorAll(".button");
      buttons.forEach((button)=>{
          let btn =button as HTMLButtonElement;
          button.addEventListener('click',async()=>{
              switch(btn.name){
                  case 'elimina':
                      await this.activityService.deleteActivityService(parseInt(btn.value));
                      this.closeModal();
                      this.renderTableActivities(null);
                      break;
                  case 'cancella':
                      this.closeModal();
                      this.renderTableActivities(null);
                      break;
                  default:
                      break; 
              }
          });
      });
  }
  closeModal() {
    let modal = document.getElementById('modal');
    if (!modal) return;
    modal.style.display = "none";
    modal.innerHTML = ``;
  }
}
