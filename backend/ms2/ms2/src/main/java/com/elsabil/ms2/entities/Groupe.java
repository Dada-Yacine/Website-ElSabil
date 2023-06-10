package com.elsabil.ms2.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;


@Entity
@Table(name = "groupe")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Groupe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupeId;

    private String nomGroupe;

    private Integer nombreEtudiants;

    private Integer nombreMaxEtudiants;

    @ElementCollection
    private List<Long> etudiantsIds;


    private String anneeNom;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "annee_id")
    private Annee annee;


}