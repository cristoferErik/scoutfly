package com.scoutfly.com.scoutfly.controllers.ActivityController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.scoutfly.com.scoutfly.controllers.ActivityController.dto.ActivityInt.ActivityFilters;
import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.activity.services.ActivityServices;

@RequestMapping("${base.url}")
@Controller
public class ActivityRestController {
    @Autowired
    private ActivityServices activityServices;

    @PostMapping("/activities/{webSiteId}")
    public ResponseEntity<?> findAllPageActivities(       
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size,
        @PathVariable Long webSiteId,
        @RequestBody ActivityFilters activityFilters)
    {
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<Activity> activitysPage=this.activityServices.findAllPageActivities(pageable,webSiteId, activityFilters);

        response.put("status","success");
        response.put("body",activitysPage.getContent());
        //response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
