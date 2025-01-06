package com.scoutfly.com.scoutfly.util.email;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.scoutfly.com.scoutfly.controllers.EmailController.dto.EmailDTO;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    
    public Map<String,Object> sendMessage(EmailDTO emailDTO ){
        Map<String,Object> response= new HashMap<>();
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("software@spaceagency.pro");
            helper.setSubject(emailDTO.getSubject());
            helper.setTo(emailDTO.getTo());
            helper.setText(emailDTO.getDescrizione());
            MultipartFile[] attachments = emailDTO.getAttachments();

            if(attachments!=null){
                for(MultipartFile file:attachments){
                    helper.addAttachment(file.getOriginalFilename(), new ByteArrayResource(file.getBytes()));
                }
            }
            mailSender.send(message);
            
            response.put("status","success");
            response.put("message","Messagio Inviato!");
        }catch(MessagingException | IOException  e){
            System.err.println(e.getMessage());
            response.put("status","success");
            response.put("message","C'è stato un errore, il messagio non è stato inviato!!");
        }
        return response;
    }
}
