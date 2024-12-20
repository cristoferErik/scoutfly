import { segmentClient } from "../components/ClientComponent.js";
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
                    const json = button === null || button === void 0 ? void 0 : button.dataset.client;
                    if (!json) {
                        break;
                    }
                    let client;
                    try {
                        client = JSON.parse(json);
                        const clientContainer = document.getElementById('client-container');
                        if (clientContainer)
                            clientContainer.style.display = "none"; //Sparirà la tabella
                        segmentClient(client);
                    }
                    catch (error) {
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