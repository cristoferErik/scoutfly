import { fetchAllActivitiesByWebSite } from "../../api/endpoints.js";
import { Activity, ActivityFilters } from "../models/Activity.js";

export class ActivityService{
    public activities: Activity[]=[];
    
    async getAllActivities(webSiteId:number,activityFilters:ActivityFilters):Promise<Activity[]>{
        const fetchActivities = await fetchAllActivitiesByWebSite<Activity[]>(webSiteId,activityFilters);
        if (fetchActivities) {
            this.activities=[...fetchActivities];
            //console.log(this.clients);
        } else {
            console.log('Error al cargar los usuarios.');
        }
        return this.activities;
    }
}