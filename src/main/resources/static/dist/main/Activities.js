import { EmailModule } from "../modules/EmailModule.js";
import { ActivityUI } from "../ui/Activity.js";
export class Activities {
    constructor() {
        let activityUI = new ActivityUI();
        activityUI.renderActivities();
        let emailModule = new EmailModule();
        emailModule.renderEmailUI();
    }
}
new Activities();
