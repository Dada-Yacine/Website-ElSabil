package com.elsabil.ms2.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class SolutionTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSolution;
    @ManyToOne
    @JoinColumn(name = "etudiant_id")
    @JsonIgnore
    private Etudiant etudiant;

    @ManyToOne
    @JoinColumn(name = "devoir_id")
    @JsonIgnore
    private tasks devoir;

    @Column(name = "file_path_solution")
    private String filePathSolution;
}
