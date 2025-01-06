package com.scoutfly.com.scoutfly.security.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class WebSecurityConfig {
    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        return http.authorizeHttpRequests((authz)->authz
        .requestMatchers("/manager/login","/manager/perform-login","/dist/**", "/styles/**","/assets/**").permitAll()
        .anyRequest()
        .authenticated())
        .sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
        .exceptionHandling(exception->exception.authenticationEntryPoint((request,response,authException)->{
            response.sendRedirect("/manager/login");
        }))
        /*
        .formLogin(form->form
            .loginPage("/login")
            .usernameParameter("email")
            .passwordParameter("password")
            .loginProcessingUrl("/perform-login")
            .permitAll())
        .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessUrl("/login?logout"))
        */
            .build();
    }
}
