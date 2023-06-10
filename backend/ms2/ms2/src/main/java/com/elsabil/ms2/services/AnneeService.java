package com.elsabil.ms2.services;

import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.entities.AnneeScolaire;
import com.elsabil.ms2.entities.Niveau;
import com.elsabil.ms2.repositories.AnneeRepository; // Importez la classe AnneeRepository si elle existe
import com.elsabil.ms2.repositories.AnneeScolaireRepository;
import com.elsabil.ms2.repositories.NiveauRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnneeService {

    @Autowired
    private AnneeRepository anneeRepository;


    @Autowired
    private AnneeScolaireRepository anneeScolaireRepository;


    @Autowired
    private NiveauRepository niveauRepository;

    public Annee ajouterAnnee(Annee nouvelleAnnee, Long anneeScolaireId, Long niveauId) throws Exception{
        AnneeScolaire anneeScolaire = anneeScolaireRepository.findById(anneeScolaireId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouvelleAnnee.setAnneeScolaire(anneeScolaire);

        Niveau niveau = niveauRepository.findById(niveauId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouvelleAnnee.setNiveau(niveau);

        return anneeRepository.save(nouvelleAnnee);
    }

    public List<Annee> getAllAnnees() {
        return anneeRepository.findAll();
    }

    public Annee getAnneeById(Long anneeId) throws Exception {
        return anneeRepository.findById(anneeId)
                .orElseThrow(() -> new Exception("Annee not found with ID: " + anneeId));
    }

    public void deleteAnnee(Long anneeId) {
        anneeRepository.deleteById(anneeId);
    }

    public Annee updateAnnee(Annee nouvelleAnnee, Long anneeScolaireId, Long niveauId) throws Exception{
        AnneeScolaire anneeScolaire = anneeScolaireRepository.findById(anneeScolaireId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouvelleAnnee.setAnneeScolaire(anneeScolaire);

        Niveau niveau = niveauRepository.findById(niveauId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouvelleAnnee.setNiveau(niveau);

        return anneeRepository.save(nouvelleAnnee);
    }
}

