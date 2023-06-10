package com.example.ms;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "niveau")
@AllArgsConstructor
@NoArgsConstructor

public class niveau {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long niveauId;

    private String niveauNom;
    @OneToMany(mappedBy = "niveau", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<annee> annees;


}
