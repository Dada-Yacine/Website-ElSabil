package com.example.ms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data @AllArgsConstructor @NoArgsConstructor
public class cours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cours_id;

    private String coursNom;
@JsonIgnore
    @ManyToOne
    @JoinColumn(name = "annee")
    private annee annee;


}
