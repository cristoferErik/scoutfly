package com.scoutfly.com.scoutfly.db.hosting.services;

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
}
