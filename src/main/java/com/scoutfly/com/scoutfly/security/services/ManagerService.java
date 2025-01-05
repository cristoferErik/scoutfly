package com.scoutfly.com.scoutfly.security.services;

import java.util.ArrayList;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scoutfly.com.scoutfly.security.entities.Manager;
import com.scoutfly.com.scoutfly.security.repositories.ManagerRepository;

import jakarta.transaction.Transactional;

@Service
public class ManagerService implements  UserDetailsService{
    @Autowired
    private ManagerRepository managerRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Transactional
    public void saveManager(Manager manager){
        String password=passwordEncoder.encode(manager.getPassword());
        manager.setPassword(password);
        managerRepository.save(manager);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Manager> managerOPT = managerRepository.findByEmail(email);
        if(managerOPT.isPresent()){
            Manager manager = managerOPT.get();
            return new User(manager.getEmail(), manager.getPassword(), new ArrayList<>());
        }else{
            throw new UsernameNotFoundException("User not found");
        }
    }
}
