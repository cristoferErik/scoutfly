export function addEventListenerButton(element) {
    const buttonContainers = document.querySelectorAll(element);
    console.log(buttonContainers);
    buttonContainers.forEach(buttonContainer => {
        buttonContainer === null || buttonContainer === void 0 ? void 0 : buttonContainer.addEventListener('click', (event) => {
            const target = event === null || event === void 0 ? void 0 : event.target;
            const button = target === null || target === void 0 ? void 0 : target.closest('button');
            if (!button)
                return;
            switch (button.name) {
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
