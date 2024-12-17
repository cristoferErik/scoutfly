package com.scoutfly.com.scoutfly.db.client.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scoutfly.com.scoutfly.db.client.entities.Client;

public interface ClientRepository extends  JpaRepository<Client, Long>{

}
