package com.scoutfly.com.scoutfly.db.client.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.scoutfly.com.scoutfly.db.client.entities.Client;

public interface ClientRepository extends  JpaRepository<Client, Long>{
    @Query("""
            SELECT c FROM Client c WHERE(:nome IS NULL OR c.nome LIKE CONCAT('%', :nome, '%')) AND
                                        (:email IS NULL OR c.email LIKE CONCAT('%', :email, '%'))
            """)
    public Page<Client>findAllByParameters(String nome,String email,Pageable pageable);
}
