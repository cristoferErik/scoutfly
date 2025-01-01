import { Client } from "./Client.js";

export enum EnumCategoria{
    Select="SELECT",
    Pago ="PAGO",
    Gratis ="GRATIS"
}
export enum EnumStatus{
    Select="SELECT",
    Attivo="ATTIVO",
    Inattivo="INATTIVO",
    Concluso="CONCLUSO",
    Pendente="PENDENTE",
    Annullato="ANNULLATO"
}

export class Activity{
    id: number=0;
    nome?: string;
    descrizione?: string;
    prezzo?: number;
    categoria?: EnumCategoria;
    status?:EnumStatus;
    dataLimite?: Date;
    durataOre?:number;
    prezzoTotale?:number;
    createAt:Date=new Date();
    updateAt:Date=new Date();
    client?:Client;
}
