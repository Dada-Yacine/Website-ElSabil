package com.example.demo.LoginController;

import com.example.demo.EmailService.EmailService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import com.example.demo.Service.Loginservice.Loginservice;
import com.example.demo.pwdDomain.PasswordResetRequest;
import com.example.demo.reponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import com.example.demo.LoginDomain.Login;
import org.springframework.core.env.Environment;

import javax.crypto.SecretKey;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;
import java.util.Map;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {
    @Autowired
    private JavaMailSender mailSender;
@Autowired
    private Environment env;
    @Autowired
    private Loginservice userService;
@Autowired
private EmailService emailService;


    @PostMapping("/forgot-password")
    public ResponseEntity<reponse> forgotPassword(@RequestParam("username") String username) {
        // Vérifiez si l'utilisateur existe dans la base de données
       // Login user = userService.findByUsername(username);
        Login user = userService.findByUsername(username);
        if (user == null) {
            // L'utilisateur n'existe pas
            reponse response = new reponse("Utilisateur introuvable", false, null, null);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        // Créer une demande de réinitialisation de mot de passe
        PasswordResetRequest resetRequest = userService.createPasswordResetRequest(user);

        // Envoyer un e-mail à l'utilisateur avec le lien de réinitialisation de mot de passe
        emailService.sendPasswordResetEmail(user.getUsername(), resetRequest.getToken());

        // Réponse réussie
        reponse response = new reponse("Un e-mail a été envoyé à votre adresse e-mail pour réinitialiser votre mot de passe.", true, null,null);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/login")
    public ResponseEntity<reponse> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        boolean oauthUser = userService.login(username, password);

        if (oauthUser) {
            String a = userService.active(username);
Login u=userService.findByUsername(username);
            if (a.equals("true")) {
                SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

                // Générer le JWT en utilisant la clé
                String token = Jwts.builder()
                        .claim("username", username)
                        .claim("role", u.getRole())
                        .claim("id", u.getId())
                        .signWith(key, SignatureAlgorithm.HS256)
                        .compact();
                System.out.println(token);
                reponse response = new reponse("Connexion réussie", true, null, token);
                return ResponseEntity.ok(response);
            } else {
                reponse response = new reponse("Compte désactivé", false, null, null);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            reponse response = new reponse("Nom d'utilisateur ou mot de passe incorrect", false, null, null);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @RequestMapping(value = {"/logout"}, method = RequestMethod.POST)
    public String logoutDo(HttpServletRequest request, HttpServletResponse response) {
        return "redirect:/login";
    }
    @PostMapping("/reset-password")
    @Transactional
    public ResponseEntity<String> resetPassword(@RequestParam("token") String resetToken,
                                                @RequestParam("password") String newPassword) throws JsonProcessingException {
        // Rechercher la demande de réinitialisation de mot de passe associée au jeton
        PasswordResetRequest token = userService.findPasswordResetToken(resetToken);
        if (token == null) {
            // Si le token est invalide
            reponse response = new reponse("Token invalide", false, null, null);
            String responseBody = new ObjectMapper().writeValueAsString(response);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseBody);
        }

        Login user = token.getCompte();
System.out.println(user.getUsername());
        // Mettre à jour le mot de passe de l'utilisateur
        userService.updatePassword(user, newPassword);


        // Réponse réussie*/
        reponse response = new reponse("Votre mot de passe a été réinitialisé avec succès.", true, null, null);
        String responseBody = new ObjectMapper().writeValueAsString(response);
        return ResponseEntity.ok(responseBody);
    }
    private String toJsonString(Object object) throws JsonProcessingException {
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}

