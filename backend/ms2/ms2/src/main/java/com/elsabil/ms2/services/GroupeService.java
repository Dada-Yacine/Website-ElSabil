package com.elsabil.ms2.services;

import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.entities.Groupe;
import com.elsabil.ms2.repositories.AnneeRepository;
import com.elsabil.ms2.repositories.CoursRepository;
import com.elsabil.ms2.repositories.GroupeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupeService {

    @Autowired
    private AnneeRepository anneeRepository;


    @Autowired
    private GroupeRepository groupeRepository;



    public Groupe ajouterGroupe(Groupe nouveauGroupe, Long anneeId) throws Exception{
        Annee annee = anneeRepository.findById(anneeId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        nouveauGroupe.setAnnee(annee);

        return groupeRepository.save(nouveauGroupe);
    }

    public List<Groupe> getAllGroupe() {
        return groupeRepository.findAll();
    }

    public void deleteGroupe(Long groupeId) {
        groupeRepository.deleteById(groupeId);
    }

    public Groupe getGroupeById(Long groupeId) throws Exception {
        return groupeRepository.findById(groupeId)
                .orElseThrow(() -> new Exception("Cours not found with ID: " + groupeId));
    }

    public Groupe updateGroupe(Groupe nouveauGroupe, Long groupeId, Long anneeId) throws Exception {
        Groupe groupe = groupeRepository.findById(groupeId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        Annee annee = anneeRepository.findById(anneeId).orElseThrow(ChangeSetPersister.NotFoundException::new);

        groupe.setNomGroupe(nouveauGroupe.getNomGroupe());
        groupe.setAnneeNom(nouveauGroupe.getAnneeNom());
        groupe.setNombreMaxEtudiants(nouveauGroupe.getNombreMaxEtudiants());
        groupe.setEtudiantsIds(nouveauGroupe.getEtudiantsIds());
        groupe.setAnnee(annee);

        return groupeRepository.save(groupe);
    }
}
