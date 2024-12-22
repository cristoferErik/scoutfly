import { Hosting } from "./Hosting";

export interface WebSite{
    id:number,
    nome:string,
    url:string,
    dataAggiornamento:Date,
    dataBackup:Date,
    descrizione:string,
    dataCreazione:Date,
    dataModifica:Date,
    hosting:Hosting
}