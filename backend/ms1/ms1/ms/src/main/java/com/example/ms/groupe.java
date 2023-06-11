package com.example.ms;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "groupe")
@NoArgsConstructor
@AllArgsConstructor
public class groupe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long groupeId;

    private String groupeNom;
    @Column(name = "annee_nom")
    private String anneeNom;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "annee_id")
    private annee annee;


}
