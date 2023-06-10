package com.example.ms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "annee")
@NoArgsConstructor
@AllArgsConstructor

public class annee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String anneeNom;
    @Column(name = "niveau_nom")
    private String niveauNom;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "niveau_Id")
    private niveau niveau;
    @OneToMany(mappedBy = "annee", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<cours> cours;
    public List<cours> getCours() {
        return cours;
    }

    public void setCours(List<cours> cours) {
        this.cours = cours;
    }

    @OneToMany(mappedBy = "annee", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<groupe> groups;
    public List<groupe> getGroups() {
        return groups;
    }


    public void setGroups(List<groupe> groups) {
        this.groups = groups;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAnneeNom() {
        return anneeNom;
    }

    public void setAnneeNom(String anneeNom) {
        this.anneeNom = anneeNom;
    }

    public String getNiveauNom() {
        return niveauNom;
    }

    public void setNiveauNom(String niveauNom) {
        this.niveauNom = niveauNom;
    }

    public com.example.ms.niveau getNiveau() {
        return niveau;
    }

    public void setNiveau(com.example.ms.niveau niveau) {
        this.niveau = niveau;
    }


}
