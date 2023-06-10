package com.elsabil.ms2.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cours")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Cours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long coursId;

    private String coursNom;

    private Integer coursCoef;

    private Long enseignantId;


    private String enseigantNom;


    private String anneeNom;



    @JsonIgnore
    @ManyToOne
    private Annee annee;

    public void updateCours(Cours updatedCours){
        this.setCoursNom(updatedCours.getCoursNom());
        this.setCoursCoef(updatedCours.getCoursCoef());
        this.setEnseignantId(updatedCours.getEnseignantId());
        this.setEnseigantNom(updatedCours.getEnseigantNom());
        this.setAnneeNom(updatedCours.getAnneeNom());
        this.setAnnee(updatedCours.getAnnee());
    }
}
