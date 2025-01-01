package com.scoutfly.com.scoutfly.controllers.WebSiteController;

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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.scoutfly.com.scoutfly.db.website.entities.WebSite;
import com.scoutfly.com.scoutfly.db.website.services.WebSiteServices;

@RequestMapping("${base.url}")
@Controller
public class WebSiteRestController {
    @Autowired
    public WebSiteServices webSiteServices;

    @GetMapping("/websites/{hostingId}")
    public ResponseEntity<?> findAllPageWebSites(
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size,
        @PathVariable Long hostingId
    ){
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<WebSite> webSitesPage=this.webSiteServices.findAllPageWebSites(pageable,hostingId);

        response.put("status","success");
        response.put("body",webSitesPage.getContent());
        //response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
