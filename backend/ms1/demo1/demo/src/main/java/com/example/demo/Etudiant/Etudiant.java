package com.example.demo.Etudiant;

import com.example.demo.LoginDomain.Login;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;


import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="Etudiant")  @Data
@AllArgsConstructor @NoArgsConstructor
public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String nom;
    private String prenom;
    @Temporal(TemporalType.DATE)
    private Date dateNaissance;

    @Nullable
    @Embedded
    private  Adresse adresse;
    private String numeroTelephone;
    @Column(unique = true)
    private String email;
    @Column(nullable = true)
    private String niveau;
    @Column(nullable =true)
    private String annee;
    @Column(nullable = true)
    private String groupe;
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private  Login compte;


private String cours;
    @Column(nullable = true)private Long idniveau;
    @Column(nullable = true)private Long idannee;
    @Column(nullable = true)private Long idgroupe;


    public String getNiveau() {
        return niveau;
    }

    public void setNiveau(String niveau) {
        this.niveau = niveau;
    }

    public String getAnnee() {
        return annee;
    }

    public void setAnnee(String annee) {
        this.annee = annee;
    }

    public String getGroupe() {
        return groupe;
    }

    public void setGroupe(String groupe) {
        this.groupe = groupe;
    }






    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    private  String role;
    public String getActive() {
        return active;
    }

    public void setActive(String active) {
        this.active = active;
    }

    private String motDePasse;
private String active;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }





    public String getNumeroTelephone() {
        return numeroTelephone;
    }

    public void setNumeroTelephone(String numeroTelephone) {
        this.numeroTelephone = numeroTelephone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
