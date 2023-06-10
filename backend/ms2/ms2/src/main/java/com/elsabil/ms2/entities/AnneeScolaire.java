package com.elsabil.ms2.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "annee_scolaire")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AnneeScolaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nom;


    @JsonIgnore
    @OneToMany(mappedBy = "anneeScolaire", cascade = CascadeType.ALL)
    private List<Annee> annees;

    public void updateFrom(AnneeScolaire anneeScolaire) {
        this.setNom(anneeScolaire.getNom());
    }
}
