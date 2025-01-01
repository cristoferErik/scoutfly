package com.scoutfly.com.scoutfly.controllers.RedirectController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class RedirectController {
    
    @GetMapping
    public String index(){
        return "index";
    }

    @GetMapping("/activities")
    public String activities(){
        return "pages/activities";
    }
}
