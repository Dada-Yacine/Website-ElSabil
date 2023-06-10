package com.example.demo.pwdDomain;

import com.example.demo.LoginDomain.Login;

import javax.persistence.*;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "password_reset_requests")
public class PasswordResetRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "compte_id")
    private Login compte;

    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false,name = "expiration_date")
    private LocalDateTime expiryDate;

    public PasswordResetRequest() {
    }

    public PasswordResetRequest(Login compte, String token, LocalDateTime expiryDate) {
        this.compte = compte;
        this.token = token;
        this.expiryDate = expiryDate;
    }

    // Getters and setters


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Login getCompte() {
        return compte;
    }

    public void setCompte(Login compte) {
        this.compte = compte;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDateTime expiryDate) {
        this.expiryDate = expiryDate;
    }
}
