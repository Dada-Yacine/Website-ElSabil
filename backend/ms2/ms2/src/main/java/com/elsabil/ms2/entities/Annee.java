package com.elsabil.ms2.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "annee")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Annee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long anneeId;

    private String anneeNom;

    private Integer nombreEtudiants;

    private Integer nombreMaxEtudiants;

    @Column(name = "annee_scolaire_nom")
    private String anneeScolaireNom;

    @Column(name = "niveau_nom")
    private String niveauNom;


    @JsonIgnore
    @ManyToOne
    private AnneeScolaire anneeScolaire;


    @JsonIgnore
    @ManyToOne
    private Niveau niveau;

    @JsonIgnore
    @OneToMany(mappedBy = "annee", cascade = CascadeType.ALL)
    private List<Cours> cours;

    @JsonIgnore
    @OneToMany(mappedBy = "annee", cascade = CascadeType.ALL)
    private List<Groupe> groupes ;




    public void updateFrom(Annee UpdatedAnnee) {
        this.setAnneeNom(UpdatedAnnee.getAnneeNom());
        this.setNiveauNom(UpdatedAnnee.getNiveauNom());
        this.setAnneeScolaireNom(UpdatedAnnee.getAnneeScolaireNom());
        this.setNombreMaxEtudiants(UpdatedAnnee.getNombreMaxEtudiants());
        this.setAnneeScolaire(UpdatedAnnee.getAnneeScolaire());
        this.setNiveau(UpdatedAnnee.getNiveau());
    }
}
