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
                    const client=JSON.parse(json);
                    
                    //const clientContainer=document.getElementById('client-container');
                    //if(clientContainer)clientContainer.style.display="none";
                    break;
                default:
                    console.log("Azione sconosciuta!");
                    break;
            }
        });
    });
}