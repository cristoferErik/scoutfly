import { WebSite } from "./WebSite.js";

enum EnumCategoria{
    Pago ="PAGO",
    Gratis ="GRATIS"
}
enum EnumStatus{
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
    webSite?:WebSite;
}
export class ActivityFilters{
    webSiteId:number=0;
    categoria?: EnumCategoria;
    status?:EnumStatus;
    dataIniziale?:Date;
    dataFinale?:Date;
    constructor(){}
}