package com.example.demo.Events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserModifieEvent {
    private Long id;
    private  String nom;
    private  String prenom;
    private String role;
    // Ajoutez d'autres champs nécessaires




}
