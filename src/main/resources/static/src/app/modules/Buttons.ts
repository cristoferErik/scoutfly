export function addEventListenerButton(element:string):void{
    const buttonContainers=document.querySelectorAll(element);
    console.log(buttonContainers);
    buttonContainers.forEach(buttonContainer=>{
        buttonContainer?.addEventListener('click',(event)=>{
            const target = event?.target as HTMLElement;
            const button = target?.closest('button');
            if(!button) return;
    
            switch(button.name){
                case 'vedi':
                    console.log('vedi');
                    break;
                case 'elimina':
                    console.log('elimina');
                    break;
                case 'seleziona':
                    console.log('seleziona');
                    break;
                default:
                    console.log("Azione sconosciuta!");
                    break;
            }
        });
    });
}