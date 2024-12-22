package com.scoutfly.com.scoutfly.db.website.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.scoutfly.com.scoutfly.db.website.entities.WebSite;

public interface WebSiteRepository extends JpaRepository<WebSite, Long>{
    @Query("""
        SELECT w FROM WebSite w where w.hosting.id=:hostingId
        """)
    Page<WebSite>findAllPageWebSitesByHosting(Pageable pageable,Long hostingId);
}
