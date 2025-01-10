package com.scoutfly.com.scoutfly.controllers.WebSiteController;

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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.scoutfly.com.scoutfly.db.website.entities.WebSite;
import com.scoutfly.com.scoutfly.db.website.services.WebSiteServices;
import static com.scoutfly.com.scoutfly.util.helpers.Converters.valueToStringIsEmpty;
import com.scoutfly.com.scoutfly.util.paginator.PageRender;
import com.scoutfly.com.scoutfly.variables.Variables;

@RequestMapping(Variables.baseUrl)
@Controller
public class WebSiteRestController {
    @Autowired
    public WebSiteServices webSiteServices;

    @GetMapping("/websites/{hostingId}")
    public ResponseEntity<?> findAllPageWebSites(
        @RequestParam (value= "page",defaultValue="0") Integer page,
        @RequestParam (value="size",defaultValue="10") Integer size,
        @PathVariable Long hostingId,
        @RequestParam Map<String,String> params
    ){
        Map<String,Object> response= new HashMap<>();
        Pageable pageable = PageRequest.of(page,size);
        Page<WebSite> webSitesPage=this.webSiteServices.findAllPageWebSites(pageable,hostingId);
        PageRender pageRender = new PageRender(page,webSitesPage.getTotalPages(),size);
        List<Integer> listNumbers=pageRender.getPageNumbers();
        String url=Variables.baseUrl+"/websites/"+hostingId;
        String paramPath=buildParamWebSiteByHosting(url,params);
        Map<String,Object> pageLinks = pageRender.generatePageLink(paramPath,listNumbers);
        response.put("status","success");
        response.put("body",webSitesPage.getContent());
        response.put("pageLinks", pageLinks);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
    private String buildParamWebSiteByHosting(String url,  Map<String,String> params) {
        String nome=params.get("nome");
        StringBuilder sb=new StringBuilder(url);
        sb.append("?");
        sb.append("nome=");
        sb.append(valueToStringIsEmpty(nome));
        return sb.toString();
    }

    @PostMapping("/website")
     public ResponseEntity<?> saveWebSite(@RequestBody WebSite webSite){
        Map<String,Object> body= this.webSiteServices.saveWebSite(webSite);
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }

    @DeleteMapping("/website/{websiteId}")
    public ResponseEntity<?> deleteWebSite(@PathVariable Long websiteId){
        Map<String,Object> body= this.webSiteServices.deleteWebSite(websiteId);
        return ResponseEntity.status(HttpStatus.OK).body(body);
    }
    
}
