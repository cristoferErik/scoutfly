package com.scoutfly.com.scoutfly.db.activity.services;

import java.time.LocalDate;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumCategoria;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumStatus;
import com.scoutfly.com.scoutfly.db.activity.repositories.ActivityRepository;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.convertToEnum;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.convertToLocalDate;

@Service
public class ActivityServices {

    @Autowired
    private ActivityRepository activityRepository;

    @Transactional(readOnly=true)
    public Page<Activity>findAllPageActivitiesByClient
    (
        Pageable pageable,
        Long clientId,
        Map<String, String> params
    ){
        
        EnumCategoria categoria=convertToEnum(EnumCategoria.class, params.get("categoria"));
        EnumStatus status=convertToEnum(EnumStatus.class,params.get("status"));
        LocalDate dataIniziale=convertToLocalDate(params.get("dataIniziale"));
        LocalDate dataFinale=convertToLocalDate(params.get("dataFinale"));
        return this.activityRepository.findActivitiesByClient(pageable,
        categoria,
        status,
        dataIniziale,
        dataFinale,
        clientId
        );
    }
    @Transactional(readOnly=true)
    public Page<Activity>findAllPageActivities(Pageable pageable,Map<String, String> params){
        EnumCategoria categoria=convertToEnum(EnumCategoria.class, params.get("categoria"));
        EnumStatus status=convertToEnum(EnumStatus.class,params.get("status"));
        LocalDate dataIniziale=convertToLocalDate(params.get("dataIniziale"));
        LocalDate dataFinale=convertToLocalDate(params.get("dataFinale"));
        String nomeCliente=params.get("nomeCliente");
        String cognomeCliente=params.get("cognomeCliente");

        return this.activityRepository.findAllActivities(pageable, categoria, status, dataIniziale, dataFinale, nomeCliente,cognomeCliente);
    }
}
