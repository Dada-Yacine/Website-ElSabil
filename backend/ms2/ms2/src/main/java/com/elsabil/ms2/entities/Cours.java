package com.elsabil.ms2.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "cours")
@NoArgsConstructor
@AllArgsConstructor
@Data
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
    @JsonIgnore

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<tasks> tasks;
    @JsonIgnore
    @ManyToMany
    @JoinTable(
            name = "cours_etudiant",
            joinColumns = @JoinColumn(name = "cours_id"),
            inverseJoinColumns = @JoinColumn(name = "etudiant_id")
    )
    private List<Etudiant> etudiants;




    @Override
    public String toString() {
        return "Courses{" +
                "id=" + coursId+
                ", name='" + coursNom + '\'' +
                ", coursCoef=" + coursCoef +
                ", idEnseignant=" +enseignantId +
                ", enseigantNom='" + enseigantNom + '\'' +
                ", anneeNom='" + anneeNom + '\'' +
                '}';
    }

}
