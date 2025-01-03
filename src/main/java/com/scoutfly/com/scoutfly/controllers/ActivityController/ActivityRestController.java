package com.scoutfly.com.scoutfly.controllers.ActivityController;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.scoutfly.com.scoutfly.db.activity.entities.Activity;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumCategoria;
import com.scoutfly.com.scoutfly.db.activity.enumerator.EnumActivity.EnumStatus;
import com.scoutfly.com.scoutfly.db.activity.services.ActivityServices;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.convertToEnum;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.convertToLocalDate;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.valueToStringIsEmpty;
import com.scoutfly.com.scoutfly.util.paginator.PageRender;
import com.scoutfly.com.scoutfly.variables.Variables;
@RequestMapping("${base.url}")
@Controller
public class ActivityRestController {
    @Autowired
    private ActivityServices activityServices;

    @GetMapping("/activities/{clientId}")
    public ResponseEntity<?> findAllPageActivitiesByClient
    (       
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size,
        @PathVariable Long clientId,
        @RequestParam Map<String, String> params)
    {
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<Activity> activitysPage=this.activityServices.findAllPageActivitiesByClient(pageable,clientId, params);
        PageRender pageRender = new PageRender(page,activitysPage.getTotalPages(),size);
        List<Integer> listNumbers=pageRender.getPageNumbers();

        String url=Variables.baseUrl+"/activities/"+clientId;

        String paramPath=buildParamPageActivitiesByClient(url,params);
        Map<String,Object> pageLinks = pageRender.generatePageLink(paramPath,listNumbers);
        response.put("status","success");
        response.put("body",activitysPage.getContent());
        response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/activities-client")
    public ResponseEntity<?>findAllPageActivities
    (
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size,
        @RequestParam Map<String, String> params
    )
    {
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<Activity> activitysPage=this.activityServices.findAllPageActivities(pageable, params);
        PageRender pageRender = new PageRender(page,activitysPage.getTotalPages(),size);
        List<Integer> listNumbers=pageRender.getPageNumbers();

        String url=Variables.baseUrl+"/activities-client";
        String paramPath=buildParamPageActivities(url,params);
        Map<String,Object> pageLinks = pageRender.generatePageLink(paramPath,listNumbers);
        response.put("status","success");
        response.put("body",activitysPage.getContent());
        response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);    
    }
    public String buildParamPageActivities(String baseUrl,Map<String, String> params){
        EnumCategoria categoria=convertToEnum(EnumCategoria.class, params.get("categoria"));
        EnumStatus status=convertToEnum(EnumStatus.class,params.get("status"));
        LocalDate dataIniziale=convertToLocalDate(params.get("dataIniziale"));
        LocalDate dataFinale=convertToLocalDate(params.get("dataFinale"));
        String nomeCliente=params.get("nome");

        StringBuilder sb=new StringBuilder(baseUrl);
        sb.append("?");
        sb.append("categoria=");
        sb.append(valueToStringIsEmpty(categoria));
        sb.append("&");
        sb.append("status=");
        sb.append(valueToStringIsEmpty(status));
        sb.append("&");
        sb.append("dataIniziale=");
        sb.append(valueToStringIsEmpty(dataIniziale));
        sb.append("&");
        sb.append("dataFinale=");
        sb.append(valueToStringIsEmpty(dataFinale));
        sb.append("&");
        sb.append("nomeCliente=");
        sb.append(valueToStringIsEmpty(nomeCliente));
        return sb.toString();
    }
    public String buildParamPageActivitiesByClient(String baseUrl,Map<String, String> params){
        EnumCategoria categoria=convertToEnum(EnumCategoria.class, params.get("categoria"));
        EnumStatus status=convertToEnum(EnumStatus.class,params.get("status"));
        LocalDate dataIniziale=convertToLocalDate(params.get("dataIniziale"));
        LocalDate dataFinale=convertToLocalDate(params.get("dataFinale"));

        StringBuilder sb=new StringBuilder(baseUrl);
        sb.append("?");
        sb.append("categoria=");
        sb.append(valueToStringIsEmpty(categoria));
        sb.append("&");
        sb.append("status=");
        sb.append(valueToStringIsEmpty(status));
        sb.append("&");
        sb.append("dataIniziale=");
        sb.append(valueToStringIsEmpty(dataIniziale));
        sb.append("&");
        sb.append("dataFinale=");
        sb.append(valueToStringIsEmpty(dataFinale));
        return sb.toString();
    }

}
