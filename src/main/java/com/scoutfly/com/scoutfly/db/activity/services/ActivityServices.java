package com.scoutfly.com.scoutfly.db.activity.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

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
        String nomeAttivita=params.get("nomeAttivita");

        return this.activityRepository.findAllActivities(
        pageable, 
        categoria, 
        status, 
        dataIniziale, 
        dataFinale, 
        nomeCliente,
        cognomeCliente,
        nomeAttivita);
    }

    @Transactional
    public Map<String,Object> saveActivity(Activity activity){
        Map<String,Object> response = new HashMap<>();
        if(activity.getId() ==null){
            activity.setCreateAt(LocalDate.now());
            activity.setUpdateAt(LocalDateTime.now());
            activity.setPrezzoTotale(activity.getPrezzo()*activity.getDurataOre());
            activityRepository.save(activity);
            response.put("status","success");
            response.put("message","Activity salvato con successo!");
        }else{
            Optional<Activity> activityOPT = this.activityRepository.findById(activity.getId());
            if(activityOPT.isPresent()){
                activity.setCreateAt(activityOPT.get().getCreateAt());
                activity.setClient(activityOPT.get().getClient());
                activity.setPrezzoTotale(activity.getPrezzo()*activity.getDurataOre());
                activity.setUpdateAt(LocalDateTime.now());
                activityRepository.save(activity);
                response.put("status","success");
                response.put("message","Activity aggiornato con successo!");
            }else{
                response.put("status","bad request");
                response.put("message","Activity non essiste!");
            }
        }
        return response;
    }

    @Transactional
    public Map<String,Object> deleteActivity(Long activityId){
        Map<String,Object> response= new HashMap<>();
        try {
            response.put("status","success");
            response.put("message","Utente Eliminato con successo!");
            this.activityRepository.deleteById(activityId);
        } catch (Exception e) {
            response.put("status","success");
            response.put("message","C'è stato un errore!");
            System.err.println(e.getMessage());
        }
        return response;
    }
}
