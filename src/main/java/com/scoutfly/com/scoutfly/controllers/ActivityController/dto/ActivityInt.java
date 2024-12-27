package com.scoutfly.com.scoutfly.controllers.ActivityController.dto;

import java.time.LocalDate;

import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity;

public interface ActivityInt {

    public class ActivityFilters{
        private EnumActivity.EnumCategoria categoria;
        private EnumActivity.EnumStatus status;
        private LocalDate dataIniziale;
        private LocalDate dataFinale;
        
        public EnumActivity.EnumCategoria getCategoria() {
            return categoria;
        }

        public void setCategoria(EnumActivity.EnumCategoria categoria) {
            this.categoria = categoria;
        }

        public EnumActivity.EnumStatus getStatus() {
            return status;
        }

        public void setStatus(EnumActivity.EnumStatus status) {
            this.status = status;
        }

        public LocalDate getDataIniziale() {
            return dataIniziale;
        }

        public void setDataIniziale(LocalDate dataIniziale) {
            this.dataIniziale = dataIniziale;
        }

        public LocalDate getDataFinale() {
            return dataFinale;
        }

        public void setDataFinale(LocalDate dataFinale) {
            this.dataFinale = dataFinale;
        }

    }
}
