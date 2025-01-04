package com.scoutfly.com.scoutfly.db.website.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.scoutfly.com.scoutfly.db.hosting.entities.Hosting;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="websites")
public class WebSite {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    private String nome;

    private String url;
    @Column(name="data_aggiornamento")
    private LocalDate dataAggiornamento;
    @Column(name="data_backup")
    private LocalDate dataBackup;

    @Column(columnDefinition="TEXT")
    private String descrizione;

    @Column(name="data_creazione")
    private LocalDateTime dataCreazione;

    @Column(name="data_modifica")
    private LocalDateTime dataModifica;

    @JsonBackReference 
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="hosting_id",nullable=false)
    private Hosting hosting;


    public WebSite() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public LocalDate getDataAggiornamento() {
        return dataAggiornamento;
    }

    public void setDataAggiornamento(LocalDate dataAggiornamento) {
        this.dataAggiornamento = dataAggiornamento;
    }

    public LocalDate getDataBackup() {
        return dataBackup;
    }

    public void setDataBackup(LocalDate dataBackup) {
        this.dataBackup = dataBackup;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public LocalDateTime getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(LocalDateTime dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public LocalDateTime getDataModifica() {
        return dataModifica;
    }

    public void setDataModifica(LocalDateTime dataModifica) {
        this.dataModifica = dataModifica;
    }

    public Hosting getHosting() {
        return hosting;
    }

    public void setHosting(Hosting hosting) {
        this.hosting = hosting;
    }
    
}
