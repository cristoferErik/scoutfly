package com.scoutfly.com.scoutfly.controllers.ClientController;

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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.scoutfly.com.scoutfly.db.client.entities.Client;
import com.scoutfly.com.scoutfly.db.client.services.ClientServices;
import com.scoutfly.com.scoutfly.util.paginator.PageRender;
import com.scoutfly.com.scoutfly.variables.Variables;

@RequestMapping(Variables.baseUrl)
@Controller
public class ClientRestController {
    
    @Autowired
    public ClientServices clientService;

    @GetMapping("/clients")
    public ResponseEntity<?> findAllPageClients(       
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size){
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<Client> clientsPage=this.clientService.findAllPageClients(pageable);
        PageRender pageRender = new PageRender(page,clientsPage.getTotalPages(),size);
        List<Integer> listNumbers=pageRender.getPageNumbers();
        Map<String,Object> pageLinks = pageRender.generatePageLink(Variables.baseUrl+"/clients",listNumbers);
        response.put("status","success");
        response.put("body",clientsPage.getContent());
        response.put("pageLinks",pageLinks);
        //response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
