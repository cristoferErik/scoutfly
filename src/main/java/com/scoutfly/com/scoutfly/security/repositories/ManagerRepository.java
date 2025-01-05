package com.scoutfly.com.scoutfly.security.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scoutfly.com.scoutfly.security.entities.Manager;

public interface ManagerRepository extends JpaRepository<Manager ,Long>{
    Optional<Manager> findByEmail(String email);
}
