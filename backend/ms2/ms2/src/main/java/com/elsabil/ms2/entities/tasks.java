package com.elsabil.ms2.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class tasks {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Date date;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Cours course;
    @Column(name = "file_path")
    private String filePath;
    @OneToMany(mappedBy = "devoir", fetch = FetchType.LAZY)
    private List<SolutionTask> solutionTasks;

}
