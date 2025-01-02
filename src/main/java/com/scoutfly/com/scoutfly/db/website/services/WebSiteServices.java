package com.scoutfly.com.scoutfly.db.website.services;

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
    public void saveWebSite(WebSite webSite){
        webSiteRepository.save(webSite);
    }
}
