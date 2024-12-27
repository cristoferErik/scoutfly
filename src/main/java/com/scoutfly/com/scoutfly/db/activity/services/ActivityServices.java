package com.scoutfly.com.scoutfly.db.activity.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.scoutfly.com.scoutfly.controllers.ActivityController.dto.ActivityInt;
import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.activity.repositories.ActivityRepository;

@Service
public class ActivityServices {

    @Autowired
    private ActivityRepository activityRepository;

    @Transactional(readOnly=true)
    public Page<Activity>findAllPageActivities
    (
        Pageable pageable,
        Long webSiteId,
        ActivityInt.ActivityFilters activityFilters
    ){
        
        return this.activityRepository.findActivitiesByFilters(pageable,
        activityFilters.getCategoria(),
        activityFilters.getStatus(),
        activityFilters.getDataIniziale(),
        activityFilters.getDataFinale(),
        webSiteId
        );
    }
}
