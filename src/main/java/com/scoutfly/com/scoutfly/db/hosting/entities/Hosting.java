package com.scoutfly.com.scoutfly.db.hosting.entities;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.scoutfly.com.scoutfly.db.client.entities.Client;
import com.scoutfly.com.scoutfly.db.website.entities.WebSite;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="hostings")
public class Hosting {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String url;

    @Column(name="username_hosting")
    private String usernameHosting;
    @Column(name="password_hosting")
    private String passwordHosting;
    private String proveedor;

    @Column(name="data_creazione")
    private LocalDateTime dataCreazione;

    @Column(name="data_modifica")
    private LocalDateTime dataModifica;

 
    @ManyToOne
    @JoinColumn(name="client_id",nullable=false)
    private Client client;
    
    @JsonManagedReference
    @OneToMany(mappedBy="hosting", cascade=CascadeType.ALL,fetch=FetchType.LAZY)
    private List<WebSite> webSiteList;

    
    public Hosting() {
        this.webSiteList=new ArrayList<>();
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
    public String getUsernameHosting() {
        return usernameHosting;
    }
    public void setUsernameHosting(String usernameHosting) {
        this.usernameHosting = usernameHosting;
    }
    public String getPasswordHosting() {
        return passwordHosting;
    }
    public void setPasswordHosting(String passwordHosting) {
        this.passwordHosting = passwordHosting;
    }
    public String getProveedor() {
        return proveedor;
    }
    public void setProveedor(String proveedor) {
        this.proveedor = proveedor;
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
    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }
    public List<WebSite> getWebSiteList() {
        return webSiteList;
    }
    public void setWebSiteList(List<WebSite> webSiteList) {
        this.webSiteList = webSiteList;
    }

}
