import { Client } from "./Client.js";

export class Hosting{
    id?:number;
    nome!:string;
    url!:string;
    usernameHosting!:string;
    passwordHosting!:string;
    proveedor!:string;
    dataCreazione?:string;
    dataModifica?:String;
    client?:Client;
}