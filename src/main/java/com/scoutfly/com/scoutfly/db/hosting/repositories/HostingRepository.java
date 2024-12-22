package com.scoutfly.com.scoutfly.db.hosting.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.scoutfly.com.scoutfly.db.hosting.entities.Hosting;

public interface HostingRepository extends JpaRepository<Hosting, Long>{
    @Query("""
            SELECT h FROM Hosting h where h.client.id=:clientId
            """)
    Page<Hosting> findAllByClient(Pageable pageable, Long clientId);
}
