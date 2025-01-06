package com.scoutfly.com.scoutfly.util.email;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;


@Configuration
public class MailConfig {
    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("mail.spaceagency.pro");
        mailSender.setPort(465); // Set your mail server port
        mailSender.setUsername("software@spaceagency.pro");
        mailSender.setPassword("m4}%arYvd+=v");

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        //props.put("mail.debug", "true");
        props.put("mail.smtp.ssl.enable", "true");
        
        return mailSender;
    }
}
