package com.scoutfly.com.scoutfly.db.hosting.services;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scoutfly.com.scoutfly.db.hosting.entities.Hosting;
import com.scoutfly.com.scoutfly.db.hosting.repositories.HostingRepository;

@Service
public class HostingServices {

    @Autowired
    HostingRepository hostingRepository;

    @Transactional(readOnly=true)
    public Page<Hosting>findAllPageHostings(Pageable pageable,Long clientId){
        return this.hostingRepository.findAllByClient(pageable,clientId);
    }
    
    @Transactional
    public Map<String,Object> saveHosting(Hosting hosting){
        Map<String,Object> response= new HashMap<>();
        if(hosting.getId()==null){
            hosting.setDataCreazione(LocalDateTime.now());
            hosting.setDataModifica(LocalDateTime.now());
            hostingRepository.save(hosting);
            response.put("status", "success");
            response.put("message","Hostin salvato con successo!");
        }else{
            Optional<Hosting> hostingOPT = this.hostingRepository.findById(hosting.getId());
            if(hostingOPT.isPresent()){
                hosting.setDataCreazione(hostingOPT.get().getDataCreazione());
                hosting.setDataModifica(LocalDateTime.now());
                hostingRepository.save(hosting);
                response.put("status", "success");
                response.put("message","Hosting aggiornato con successo!");
            }else{
                response.put("status", "success");
                response.put("message","Hosting aggiornato con successo!");
            }
        }
        return response;
    }

    @Transactional
    public Map<String,Object> deleteHosting(Long hostingId){
        Map<String,Object> response= new HashMap<>();
        try {
            response.put("status","success");
            response.put("message","Hosting eliminato con successo!");
            this.hostingRepository.deleteById(hostingId);    
        } 
        catch (Exception e) {
            response.put("status", "errore");
            response.put("message","C'è stato un'errore");
        }
        return response;
    }
}
