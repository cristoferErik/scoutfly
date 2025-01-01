package com.scoutfly.com.scoutfly.db.activity.repositories;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long>{

    @Query("""
            SELECT a FROM Activity a WHERE  
                (:categoria is NULL OR a.categoria =: categoria)AND
                (:status is NULL OR a.status= :status) AND
                (:dataIniziale is NULL OR a.createAt>= :dataIniziale) AND
                (:dataFinale is NULL OR a.createAt<= :dataFinale) AND
                (a.client.id= :clientId)
                ORDER BY a.createAt DESC
            """)
    Page<Activity> findActivitiesByClient(Pageable pageable,
                                            EnumActivity.EnumCategoria categoria,
                                            EnumActivity.EnumStatus status,
                                            LocalDate dataIniziale,
                                            LocalDate dataFinale,
                                            Long clientId
                                            );

    @Query("""
            SELECT a
            FROM Activity a 
            JOIN FETCH a.client c    
            WHERE 
                (:categoria is NULL OR a.categoria =: categoria)AND
                (:status is NULL OR a.status= :status) AND
                (:dataIniziale is NULL OR a.createAt>= :dataIniziale) AND
                (:dataFinale is NULL OR a.createAt<= :dataFinale) AND
                (:nomeCliente is NULL OR c.nome LIKE CONCAT('%',:nomeCliente,'%')) AND
                (:cognomeCliente is NULL OR c.cognome LIKE CONCAT('%',:cognomeCliente,'%'))
                ORDER BY a.createAt DESC
            """)
    Page<Activity> findAllActivities(Pageable pageable,
                                        EnumActivity.EnumCategoria categoria,
                                        EnumActivity.EnumStatus status,
                                        LocalDate dataIniziale,
                                        LocalDate dataFinale,
                                        String nomeCliente,
                                        String cognomeCliente);
}
