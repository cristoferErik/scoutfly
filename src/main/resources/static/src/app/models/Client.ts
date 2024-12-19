import { Hosting } from "./Hosting.js"

export interface Client{
    id: number,
    nome: string,
    cognome: string,
    indirizzo: string,
    telefono:string,
    email:string,
    createAt: Date,
    hostings:Hosting[]
}