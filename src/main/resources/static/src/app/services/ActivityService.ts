
import { fetchAllActivities, fetchAllActivitiesByClient, fetchDeleteActivity, fetchSaveActivity } from "../../api/endpoints.js";
import { pageLinks } from "../interfaces/ClientInt.js";
import { Activity } from "../models/Activity.js";

export class ActivityService{
    public activities: Activity[]=[];
    public pageLinks?:pageLinks;
    async getAllActivitiesByClient(clienteId:number,parameters:string|null):Promise<Activity[]>{
        const fetchActivities = await fetchAllActivitiesByClient(clienteId,parameters);
        if (fetchActivities) {
            this.activities=[...fetchActivities.body];
            this.pageLinks={...fetchActivities.pageLinks};
            //console.log(this.clients);
        } else {
            console.log('Error al cargar los usuarios.');
        }
        return this.activities;
    }
    async getAllActivities(parameters:string|null):Promise<Activity[]>{
        const fetchActivities = await fetchAllActivities(parameters);
        if (fetchActivities) {
            this.activities=[...fetchActivities.body];
            this.pageLinks={...fetchActivities.pageLinks};
            //console.log(this.clients);
        } else {
            console.log('Error al cargar los usuarios.');
        }
        return this.activities;
    }
    async fetchSaveActivityService(activity:Activity):Promise<string>{
        let message:string="";
        const fetchClient= await fetchSaveActivity(activity);
        if(fetchClient){
            message=fetchClient.message;
        }
        return message;
    }
    async deleteActivityService(activityId:number):Promise<string>{
        let message:string="";
        const fetchActivity= await fetchDeleteActivity(activityId);
        if(fetchActivity){
            message=fetchActivity.message;
        }
        return message;
    }
}