
import { fetchAllActivities, fetchAllActivitiesByClient } from "../../api/endpoints.js";
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
}