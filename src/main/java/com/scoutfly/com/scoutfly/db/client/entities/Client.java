package com.scoutfly.com.scoutfly.db.client.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.hosting.entities.Hosting;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;


@Entity
@Table(name="clients")
public class Client {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cognome;
    private String indirizzo;
    private String telefono;
    private String email;

    @Column(name="create_at")
    private LocalDate createAt;

    @JsonIgnore
    @OneToMany(mappedBy="client",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Hosting> listHosting;

    @JsonIgnore
    @OneToMany(mappedBy="client",cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<Activity> listActivity;
    
    public Client() {
       this.listHosting=new ArrayList<>();
       this.listActivity=new ArrayList<>();
    }

    @PrePersist
    public void prePersist() {
        this.createAt = LocalDate.now();
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
    public String getCognome() {
        return cognome;
    }
    public void setCognome(String cognome) {
        this.cognome = cognome;
    }
    public String getIndirizzo() {
        return indirizzo;
    }
    public void setIndirizzo(String indirizzo) {
        this.indirizzo = indirizzo;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    
    public List<Hosting> getListHosting() {
        return listHosting;
    }
    public void setListHosting(List<Hosting> listHosting) {
        this.listHosting = listHosting;
    }

    public List<Activity> getListActivity() {
        return listActivity;
    }

    public void setListActivity(List<Activity> listActivity) {
        this.listActivity = listActivity;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }


    
}
