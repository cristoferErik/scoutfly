package com.scoutfly.com.scoutfly.db.activity.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumCategoria;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumStatus;
import com.scoutfly.com.scoutfly.db.client.entities.Client;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="activities")
public class Activity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY )
    private Long id;
    private String nome;
    private String descrizione;
    private Double prezzo;

    @Enumerated(EnumType.STRING)
    private EnumCategoria categoria;

    @Enumerated(EnumType.STRING)
    private EnumStatus status;
    
    @Column(name="data_limite")
    private LocalDate dataLimite;
    
    @Column(name="durata_ore")
    private Integer durataOre;

    @Column(name="prezzo_totale")
    private Double prezzoTotale;

    @Column(name="create_at")
    private LocalDate createAt;

    @Column(name="update_at")
    private LocalDateTime updateAt;

    
    @ManyToOne()
    @JoinColumn(name="client_id")
    private Client client;

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

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public EnumCategoria getCategoria() {
        return categoria;
    }

    public void setCategoria(EnumCategoria categoria) {
        this.categoria = categoria;
    }

    public EnumStatus getStatus() {
        return status;
    }

    public void setStatus(EnumStatus status) {
        this.status = status;
    }
    public LocalDate getDataLimite() {
        return dataLimite;
    }

    public void setDataLimite(LocalDate dataLimite) {
        this.dataLimite = dataLimite;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public LocalDateTime getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(LocalDateTime updateAt) {
        this.updateAt = updateAt;
    }

    public Double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(Double prezzo) {
        this.prezzo = prezzo;
    }

    public Integer getDurataOre() {
        return durataOre;
    }

    public void setDurataOre(Integer durataOre) {
        this.durataOre = durataOre;
    }

    public Double getPrezzoTotale() {
        return prezzoTotale;
    }

    public void setPrezzoTotale(Double prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
}
