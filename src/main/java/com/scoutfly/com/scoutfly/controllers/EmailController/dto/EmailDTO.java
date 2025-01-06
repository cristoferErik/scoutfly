package com.scoutfly.com.scoutfly.controllers.EmailController.dto;

import org.springframework.web.multipart.MultipartFile;

public class EmailDTO {
    private String to;
    private String subject;
    private String descrizione;
    private MultipartFile[] attachments;

    public String getTo() {
        return to;
    }
    public void setTo(String to) {
        this.to = to;
    }
    public String getSubject() {
        return subject;
    }
    public void setSubject(String subject) {
        this.subject = subject;
    }
    public String getDescrizione() {
        return descrizione;
    }
    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }
    public MultipartFile[] getAttachments() {
        return attachments;
    }
    public void setAttachments(MultipartFile[] attachment) {
        this.attachments = attachment;
    } 
}
