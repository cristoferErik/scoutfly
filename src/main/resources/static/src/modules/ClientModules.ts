import { Client } from "../app/models/Client.js";//Aggiungere js alle
import { segmentClient } from "../components/ClientComponent.js";


export function addEventListenerClientButton(element:string):void{
    const buttonContainers=document.querySelectorAll(element);
    buttonContainers.forEach(buttonContainer=>{
        buttonContainer?.addEventListener('click',(event)=>{
            const target = event?.target as HTMLElement;
            const button = target?.closest('button');
            if(!button) return;
    
            switch(button.name){
                case 'vedi':
                    break;
                case 'elimina':
                    console.log('elimina');
                    break;
                case 'seleziona':
                    console.log('seleziona');
                    const json=button?.dataset.client;
                    if(!json){
                        break;
                    }
                    let client:Client;
                    try{
                        client=JSON.parse(json);
                         const clientContainer=document.getElementById('client-container');
                        if(clientContainer)clientContainer.style.display="none";//Sparirà la tabella
                        segmentClient(client);
                    }catch(error){
                        console.error('Error parsing JSON:', error);
                    }    
                   
                    break;
                default:
                    console.log("Azione sconosciuta!");
                    break;
            }
        });
    });
}
