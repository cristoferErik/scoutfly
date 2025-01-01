export var EnumCategoria;
(function (EnumCategoria) {
    EnumCategoria["Select"] = "SELECT";
    EnumCategoria["Pago"] = "PAGO";
    EnumCategoria["Gratis"] = "GRATIS";
})(EnumCategoria || (EnumCategoria = {}));
export var EnumStatus;
(function (EnumStatus) {
    EnumStatus["Select"] = "SELECT";
    EnumStatus["Attivo"] = "ATTIVO";
    EnumStatus["Inattivo"] = "INATTIVO";
    EnumStatus["Concluso"] = "CONCLUSO";
    EnumStatus["Pendente"] = "PENDENTE";
    EnumStatus["Annullato"] = "ANNULLATO";
})(EnumStatus || (EnumStatus = {}));
export class Activity {
    constructor() {
        this.id = 0;
        this.createAt = new Date();
        this.updateAt = new Date();
    }
}
