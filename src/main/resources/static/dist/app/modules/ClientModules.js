export function addEventListenerClientButton(element) {
    const buttonContainers = document.querySelectorAll(element);
    buttonContainers.forEach(buttonContainer => {
        buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener('click', (event) => {
            const target = event === null || event === void 0 ? void 0 : event.target;
            const button = target === null || target === void 0 ? void 0 : target.closest('button');
            if (!button)
                return;
            switch (button.name) {
                case 'vedi':
                    break;
                case 'elimina':
                    console.log('elimina');
                    break;
                case 'seleziona':
                    console.log('seleziona');
                    const json = button.dataset.client;
                    if (json)
                        console.log(JSON.parse(json));
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
