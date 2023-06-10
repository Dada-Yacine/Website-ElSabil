package com.example.demo.Command;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.axonframework.modelling.command.TargetAggregateIdentifier;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class ModifierUserCommand {
    @TargetAggregateIdentifier
    private Long id;
    private String nom;
    private String prenom;
    private String role;


}
