var EnumCategoria;
(function (EnumCategoria) {
    EnumCategoria["Pago"] = "PAGO";
    EnumCategoria["Gratis"] = "GRATIS";
})(EnumCategoria || (EnumCategoria = {}));
var EnumStatus;
(function (EnumStatus) {
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
export class ActivityFilters {
    constructor() {
        this.webSiteId = 0;
    }
}
