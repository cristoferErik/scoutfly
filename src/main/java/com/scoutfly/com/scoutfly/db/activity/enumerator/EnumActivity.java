package com.scoutfly.com.scoutfly.db.activity.enumerator;

public interface EnumActivity{
    public enum EnumCategoria {
        PAGO,
        GRATIS
    }
    
    public enum EnumStatus{
        ATTIVO,
        INATTIVO,
        CONCLUSO,
        PENDENTE,
        ANNULLATO
    }
}