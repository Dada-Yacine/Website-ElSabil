package com.example.demo.Etudiant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Data

public class userDTO {
    private Long id;
    private String nom;
    private String prenom;
    private String numeroTelephone;


    private Adresse adresse;
    private String role;
    private Date datenaissance;
    private String email;
    private String compteEmail;
    private String comptePassword;
}
