import { Client } from "../app/models/Client.js";

export function segmentClient(client: Client): void {
    const clientSegment = document.getElementById("client-segment");
    if (!clientSegment) return;
    clientSegment.style.display="block";
    clientSegment.innerHTML = `
        <div class="container-data">
            <div class="title">
                <div>Cliente</div>
                <div class="button-container">
                    <button class="button" name="back"  type="button"><-Back</button>
                </div>
            </div>
            <div class="container-detail">
                <div class="item">
                    <div class="subtitle">Id</div>
                    <div >${client.id}</div>
                </div>
                <div class="item">
                    <div class="subtitle">Nome</div>
                    <div >${client.nome}  ${client.cognome}</div>
                </div>
                <div class="item">
                    <div class="subtitle">Email</div>
                    <div>${client.email}</div>
                </div>
                
            </div>
        </div>
    `;
    addEventListenerClientSegment();
}

export function addEventListenerClientSegment():void{
    const clientSegment = document.getElementById("client-segment");
    if(clientSegment){
        const buttonContainers=clientSegment.querySelectorAll(".button");
        buttonContainers?.forEach(buttonContainer=>{
            buttonContainer?.addEventListener('click',(event)=>{
                const target = event?.target as HTMLElement;
                const button = target?.closest('button');
                if(!button) return;

                switch(button.name){
                    case 'back':
                        const clientContainer=document.getElementById('client-container');
                        if(clientContainer)clientContainer.style.display="block";//Sparirà la tabella
                        clientSegment.style.display="none";
                        break;
                    default:
                        console.log("Azione sconosciuta");
                        break;
                }
            });
        });
    }else{
        console.error("clientSegment doesnt exist!");
    }
    
}