package com.scoutfly.com.scoutfly.db.website.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scoutfly.com.scoutfly.db.website.entities.WebSite;
import com.scoutfly.com.scoutfly.db.website.repositories.WebSiteRepository;

@Service
public class WebSiteServices {

    @Autowired
    private WebSiteRepository webSiteRepository;

    @Transactional(readOnly=true)
    public Page<WebSite>findAllPageWebSites(Pageable pageable,Long HostingId){
        return this.webSiteRepository.findAllPageWebSitesByHosting(pageable,HostingId);
    }
    
    @Transactional
    public Map<String,Object>  saveWebSite(WebSite webSite){
        Map<String,Object> response= new HashMap<>();
        if(webSite.getId()==null){
            webSite.setDataCreazione(LocalDateTime.now());
            webSite.setDataModifica(LocalDateTime.now());
            this.webSiteRepository.save(webSite);
            response.put("status","success");
            response.put("message","WebSite salvato con successo");
        }else{
            Optional<WebSite> webSiteOPT= this.webSiteRepository.findById(webSite.getId());
            if(webSiteOPT.isPresent()){
                webSite.setDataCreazione(webSiteOPT.get().getDataCreazione());
                webSite.setDataModifica(LocalDateTime.now());

                this.webSiteRepository.save(webSite);
                response.put("status","success");
                response.put("message","WebSite aggiornato con successo!");
            }else{
                response.put("status","success");
                response.put("message","WebSite non essiste, per ciò non può essere agiornato!");
            }
        }
        return response;
    }
}
