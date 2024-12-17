package com.scoutfly.com.scoutfly.db.client.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.scoutfly.com.scoutfly.db.client.entities.Client;
import com.scoutfly.com.scoutfly.db.client.repositories.ClientRepository;

@Service
public class ClientServices {

    @Autowired
    private ClientRepository clientRepository;

    
    public Page<Client>findAllPageClients(Pageable pageable){
        return this.clientRepository.findAll(pageable);
    }
}
