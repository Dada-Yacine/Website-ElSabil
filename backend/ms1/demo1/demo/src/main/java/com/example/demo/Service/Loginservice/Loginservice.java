package com.example.demo.Service.Loginservice;


import com.example.demo.LoginDomain.Login;
import com.example.demo.Loginrepository.LoginRepository;
/*import com.example.demo.MyPasswordEncoder;
import com.example.demo.MyPasswordEncoder;*/
import com.example.demo.pwdDomain.PasswordResetRequest;
import com.example.demo.pwdRepository.PasswordResetRequestRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
    public class Loginservice {
        @Autowired
        private LoginRepository repo;
@Autowired
    PasswordResetRequestRepository passwordResetRequestRepository;
   /* @Autowired
    private MyPasswordEncoder passwordEncoder;*/
        public boolean login(String username, String password) {
            Login user = repo.findByUsernameAndPassword(username, password);

            return user !=null ;
        }
    public Login findByUsername(String username) {
        Login user = repo.findByUsername(username);
        return user ;
    }
    public String active(String username){
            String active=repo.findActiveByUsername(username);
            return active;
    }
    public List< PasswordResetRequest> findAllByCompte(Login user) {
        return passwordResetRequestRepository.findAllByCompte(user);
    }
    public PasswordResetRequest createPasswordResetRequest(Login user) {
        PasswordResetRequest resetRequest = new PasswordResetRequest();
        resetRequest.setCompte(user);
        resetRequest.setToken(UUID.randomUUID().toString());
        resetRequest.setExpiryDate(LocalDateTime.now().plusHours(24));
        passwordResetRequestRepository.save(resetRequest);
        return resetRequest;
    }
    @Transactional
    public PasswordResetRequest findPasswordResetToken(String token) {
        return passwordResetRequestRepository.findByToken(token);
    }
    public void deleteAllByUser(Login user) {
        List< PasswordResetRequest> resetTokens = passwordResetRequestRepository.findAllByCompte(user);
        passwordResetRequestRepository.deleteAll(resetTokens);
    }
  public void updatePassword(Login user, String newPassword) {
        user.setPassword(newPassword);
        repo.save(user);

        passwordResetRequestRepository.deleteAllByCompte(user);
    }
    }

