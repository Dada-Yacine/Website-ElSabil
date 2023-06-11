package com.example.demo.pwdRepository;

import com.example.demo.LoginDomain.Login;
import com.example.demo.pwdDomain.PasswordResetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordResetRequestRepository extends JpaRepository<PasswordResetRequest, Long> {
    PasswordResetRequest findByToken(String token);
    PasswordResetRequest findByCompte(Login user);

    List<PasswordResetRequest> findAllByCompte(Login user);

    void deleteByToken(PasswordResetRequest token);

    void deleteAllByCompte(Login user);


}
