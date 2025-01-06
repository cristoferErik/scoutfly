var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Email } from "../app/models/Email.js";
import { EmailService } from "../app/services/EmailService.js";
export class EmailModule {
    constructor() {
        this.filesArray = [];
        this.emailService = new EmailService();
    }
    renderEmailUI() {
        let emailCard = document.getElementById("card-email");
        if (!emailCard)
            return;
        emailCard.innerHTML = ``;
        let email_container = `
            <form class="email-container" id="email-form">
                <div class="container-bigTittle">
                    <p>Nuovo Messagio</p>
                </div>
                <div class="item-email">
                    <label for="to">To</label>
                    <input type="text" name="to" id="to">
                </div>
                <div class="item-email">
                    <label for="subject">subject</label>
                    <input type="text" name="subject" id="subjet">
                </div>
                <div class="item-email">
                    <textarea name="message" id="message" contenteditable="true"></textarea>
                </div>
                <div class="file-container">
                    <label class="file-label" for="file">
                        Allega un documento
                    </label>
                    <input class="file" type="file" name="file" id="file" multiple>
                        <ul class="file-list" id="file-list">
                        </ul>
                </div>
                <div class="button-container">
                    <button type="button" name="invia" class="button bt-green">Invia messagio</button>
                </div>

            </form>
        `;
        emailCard.innerHTML = email_container;
        this.addFiles();
        this.addEventListenerButton();
    }
    addEventListenerButton() {
        const element = document.getElementById("email-form");
        if (!element)
            return;
        const tableContainer = element.querySelector(".button-container");
        if (!tableContainer)
            return;
        const buttons = tableContainer.querySelectorAll(".button");
        buttons.forEach((button) => {
            button === null || button === void 0 ? void 0 : button.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
                let btn = button;
                switch (btn.name) {
                    case 'invia':
                        this.sendMessage();
                        break;
                    default:
                        break;
                }
            }));
        });
    }
    sendMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            const element = document.getElementById("email-form");
            const formData = new FormData(element);
            let email = new Email();
            email.to = formData.get('to').trim();
            email.subject = formData.get('subject');
            email.descrizione = formData.get('message');
            email.attachments = Array.from(formData.getAll('file'));
            yield this.emailService.sendMessage(email);
            element.reset();
            this.filesArray = [];
            this.updateFileList();
        });
    }
    addFiles() {
        let fileInput = document.getElementById('file');
        if (!fileInput)
            return;
        /*Change significa che ogni volta che si modifiche un input ,se realizara un evento*/
        fileInput.addEventListener('change', () => {
            let fileList = fileInput.files;
            if (fileList && fileList.length > 0) {
                /*Convertire in array normali e quindi specificare che sia di tipo File */
                const files = Array.from(fileList);
                this.filesArray.push(...files);
                this.updateFileList();
            }
        });
    }
    updateFileList() {
        let filesContainer = document.getElementById("file-list");
        if (!filesContainer)
            return;
        filesContainer.innerHTML = "";
        if (this.filesArray.length > 0) {
            this.filesArray.forEach((file, index) => {
                const li = document.createElement("li");
                li.textContent = file.name;
                const removeButton = document.createElement("span");
                removeButton.textContent = "❌"; // Usiamo il emoji "X"
                removeButton.classList.add("remove-file");
                removeButton.addEventListener("click", () => {
                    let fileInput = document.getElementById('file');
                    this.filesArray.splice(index, 1); // Eliminar archivo del array
                    const dataTransfer = new DataTransfer();
                    this.filesArray.forEach(file => {
                        dataTransfer.items.add(file);
                    });
                    fileInput.files = dataTransfer.files;
                    this.updateFileList(); // Volver a renderizar la lista
                });
                li.appendChild(removeButton);
                filesContainer.appendChild(li);
            });
        }
    }
}
