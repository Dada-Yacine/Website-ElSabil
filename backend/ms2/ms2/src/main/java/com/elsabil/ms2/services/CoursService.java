package com.elsabil.ms2.services;

import com.elsabil.ms2.DTO.CoursDto;
import com.elsabil.ms2.entities.Annee;

import com.elsabil.ms2.entities.Cours;

import com.elsabil.ms2.repositories.AnneeRepository;

import com.elsabil.ms2.repositories.CoursRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CoursService {

    @Autowired
    private AnneeRepository anneeRepository;


    @Autowired
    private CoursRepository coursRepository;



    public Cours ajouterCours(Cours nouveauCours, Long anneeId) throws Exception{
        Annee annee = anneeRepository.findById(anneeId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouveauCours.setAnnee(annee);

        return coursRepository.save(nouveauCours);
    }

    public List<Cours> getAllCours() {
        return coursRepository.findAll();
    }

    public void deleteCours(Long coursId) {
        coursRepository.deleteById(coursId);
    }

    public Cours getCoursById(Long coursId) throws Exception {
        return coursRepository.findById(coursId)
                .orElseThrow(() -> new Exception("Cours not found with ID: " + coursId));
    }

    public Cours updateCours(Cours nouveauCours, Long coursId, Long anneeId) throws Exception {
        Cours cours = coursRepository.findById(coursId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        Annee annee = anneeRepository.findById(anneeId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        cours.setCoursNom(nouveauCours.getCoursNom());
        cours.setCoursCoef(nouveauCours.getCoursCoef());
        cours.setEnseignantId(nouveauCours.getEnseignantId());
        cours.setEnseigantNom(nouveauCours.getEnseigantNom());
        cours.setAnneeNom(nouveauCours.getAnneeNom());
        cours.setAnnee(annee);

        return coursRepository.save(cours);
    }

}
