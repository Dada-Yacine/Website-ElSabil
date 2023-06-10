package com.elsabil.ms2.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "niveau")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Niveau {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long niveauId;

    private String niveauNom;

    @Column(name = "nombre_max_etudiants")
    private int nombreMaxDetudiants;

    @Column(name = "nombre_etudiants")
    private int nombreDetudiants;



    @JsonIgnore
    @OneToMany(mappedBy = "niveau", cascade = CascadeType.ALL)
    private List<Annee> annees;


    public void updateFrom(Niveau updatedNiveau) {
        this.setNiveauNom(updatedNiveau.getNiveauNom());
        this.setNombreMaxDetudiants(updatedNiveau.getNombreMaxDetudiants());
    }

}
