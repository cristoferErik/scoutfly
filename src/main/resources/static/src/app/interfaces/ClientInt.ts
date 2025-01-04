import { Activity } from "../models/Activity.js";
import { Client } from "../models/Client.js";
import { WebSite } from "../models/WebSite.js";

export interface Numbers{
    page:string,
    link:string,
    actual:boolean,
}
export interface pageLinks{
    first:string;
    prev:string;
    numbers:Numbers[];
    next:string;
    last:string;
}
export interface ClientResponse{
    status:string,
    body:Client[];
    pageLinks:pageLinks;
}

export interface ActivityResponse{
    status:string,
    body:Activity[];
    pageLinks:pageLinks;
}
export interface WebSiteResponse{
    status:string,
    body:WebSite[];
    pageLinks:pageLinks;
}