package com.scoutfly.com.scoutfly.controllers.EmailController;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.scoutfly.com.scoutfly.controllers.EmailController.dto.EmailDTO;
import com.scoutfly.com.scoutfly.util.email.EmailService;
import com.scoutfly.com.scoutfly.variables.Variables;

@RequestMapping(Variables.baseUrl)
@RestController
public class EmailRestController {
    @Autowired
    EmailService emailService;

    @PostMapping("/email")
    public ResponseEntity<?> sendEmail(@RequestParam("to") String to,
        @RequestParam("subject") String subject,
        @RequestParam("descrizione") String descrizione,
        @RequestParam("file") MultipartFile[] attachments
        ){
        EmailDTO emailDTO= new EmailDTO();
        emailDTO.setTo(to);
        emailDTO.setSubject(subject);
        emailDTO.setDescrizione(descrizione);
        emailDTO.setAttachments(attachments);
        
        Map<String,Object> response= emailService.sendMessage(emailDTO);  
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}   
