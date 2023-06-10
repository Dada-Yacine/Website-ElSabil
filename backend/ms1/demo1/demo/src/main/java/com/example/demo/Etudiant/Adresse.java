package com.example.demo.Etudiant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Adresse {
    private String wilaya;
    private String ville;
    private String rue;
}
