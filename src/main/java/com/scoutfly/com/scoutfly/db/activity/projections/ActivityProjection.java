package com.scoutfly.com.scoutfly.db.activity.projections;

import java.time.LocalDateTime;

import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumCategoria;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumStatus;

public interface ActivityProjection {
    public interface ActivityByClients{
        public Long getId();
        public String getNomeCliente();
        public String getDescrizione();
        public Double getPrezzo();
        public EnumCategoria getCategoria();
        public EnumStatus getStatus();
        public LocalDateTime getDataLimite();
        public Integer getDurataOre();
        public Double getPrezzoTotale();
        public String getCreateAt();
    }
}
