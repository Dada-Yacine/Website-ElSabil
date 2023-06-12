package com.example.demo.LoginDomain;


import com.example.demo.Etudiant.Etudiant;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.*;

@Entity
@Table(name="login")
@Data
public class Login {
  @Id

    private Long id;
    private String username;
    private String password;
    @Column(nullable = false)
    private String active;
    private String role;
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Etudiant user;





    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Login()
    {
    }

    public Login(Long id, String username, String password,String active,String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.active=active;
        this.role=role;

    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }
}
//https://www.tutussfunny.com/spring-boot-login-and-logout-with-mysql-database/
