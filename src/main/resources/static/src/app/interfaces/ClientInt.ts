import { Client } from "../models/Client.js";

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