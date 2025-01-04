package com.scoutfly.com.scoutfly.db.client.services;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scoutfly.com.scoutfly.db.client.entities.Client;
import com.scoutfly.com.scoutfly.db.client.repositories.ClientRepository;

@Service
public class ClientServices {

    @Autowired
    private ClientRepository clientRepository;

    @Transactional(readOnly=true)
    public Page<Client>findAllPageClients(String name,String email,Pageable pageable){
        return this.clientRepository.findAllByParameters(name,email,pageable);
    }

    @Transactional
    public Map<String,Object> saveClient(Client client){
        Map<String,Object> response = new HashMap<>();
        if(client.getId() ==null){
            client.setCreateAt(LocalDate.now());
            clientRepository.save(client);
            response.put("status","success");
            response.put("message","Cliente salvato con successo!");
        }else{
            Optional<Client> clientOPT = this.clientRepository.findById(client.getId());
            if(clientOPT.isPresent()){
                client.setCreateAt(clientOPT.get().getCreateAt());
                clientRepository.save(client);
                response.put("status","success");
                response.put("message","Cliente aggiornato con successo!");
            }else{
                response.put("status","bad request");
                response.put("message","Cliente non essiste!");
            }
        }
        return response;
    }
    @Transactional
    public Map<String,Object> deleteClient(Long clientId){
        Map<String,Object> response= new HashMap<>();
        try {
            response.put("status","success");
            response.put("message","cliente eliminato con successo!");
            this.clientRepository.deleteById(clientId);    
        } catch (Exception e) {
            response.put("status","error");
            response.put("message","C'è stato un'errore!");
        }
        return response;
    }
}
