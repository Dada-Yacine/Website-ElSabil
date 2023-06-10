package com.elsabil.ms2.services;

import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.entities.AnneeScolaire;
import com.elsabil.ms2.repositories.AnneeRepository;
import com.elsabil.ms2.repositories.AnneeScolaireRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnneeScolaireService {

    private final AnneeScolaireRepository anneeScolaireRepository;

    private final AnneeRepository anneeRepository;

    public AnneeScolaire ajouterAnneeScolaire(AnneeScolaire anneeScolaire){
        return anneeScolaireRepository.save(anneeScolaire);
    }

    public List<AnneeScolaire> getAllAnneeScolaires() {
        return anneeScolaireRepository.findAll();
    }

    public AnneeScolaire getAnneeScolaireById(Long anneeScolaireId) throws Exception {
        return anneeScolaireRepository.findById(anneeScolaireId)
                .orElseThrow(() -> new Exception("Niveau not found with ID: " + anneeScolaireId));
    }

    public void deleteAnneeScolaire(Long id) {
        anneeScolaireRepository.deleteById(id);
    }

    public void updateAnneeScolaire(Long anneeScolaireId, AnneeScolaire updatedAnneeScolaire) throws Exception {
        AnneeScolaire anneeScolaire = anneeScolaireRepository.findById(anneeScolaireId)
                .orElseThrow(() -> new Exception("AnneeScolaire not found with ID: " + anneeScolaireId));



        anneeScolaire.updateFrom(updatedAnneeScolaire);

        anneeScolaire.getAnnees().forEach(annee -> {
            annee.setAnneeScolaireNom(anneeScolaire.getNom());
        });
        anneeScolaireRepository.save(anneeScolaire);
    }
}
