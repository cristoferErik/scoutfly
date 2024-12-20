package com.scoutfly.com.scoutfly.controllers.HostingController;

import java.util.HashMap;
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

import com.scoutfly.com.scoutfly.db.hosting.entities.Hosting;
import com.scoutfly.com.scoutfly.db.hosting.services.HostingServices;

@RequestMapping("${base.url}")
@Controller
public class HostingRestController {
    @Autowired
    public HostingServices hostingServices;

    @GetMapping("/hostings")
    public ResponseEntity<?> findAllPageHostings(       
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size)
    {
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<Hosting> hostingsPage=this.hostingServices.findAllPageHostings(pageable);

        response.put("status","success");
        response.put("body",hostingsPage.getContent());
        //response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
