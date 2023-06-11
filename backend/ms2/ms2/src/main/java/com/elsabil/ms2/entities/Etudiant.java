package com.elsabil.ms2.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

public class Etudiant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany(mappedBy = "etudiants")
    private List<Cours> cours;
    @OneToMany(mappedBy = "devoir", fetch = FetchType.LAZY)
    private List<SolutionTask> solutionTasks;
}
