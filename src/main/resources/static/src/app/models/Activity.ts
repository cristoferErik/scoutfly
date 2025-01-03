import { Client } from "./Client.js";

export enum EnumCategoria{
    SELECT="SELECT",
    PAGO ="PAGO",
    GRATIS ="GRATIS"
}
export enum EnumStatus{
    SELECT="SELECT",
    ATTIVO="ATTIVO",
    INATTIVO="INATTIVO",
    CONCLUSO="CONCLUSO",
    PENDENTE="PENDENTE",
    ANNULLATO="ANNULLATO"
}

export class Activity{
    id?: number;
    nome!: string;
    descrizione!: string;
    prezzo!: number;
    categoria!: EnumCategoria;
    status!:EnumStatus;
    dataLimite!: Date;
    durataOre!:number;
    prezzoTotale?:number;
    createAt?:Date;
    updateAt?:Date;
    client?:Client;
}
