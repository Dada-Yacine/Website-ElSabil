package com.elsabil.ms2.controller;

import com.elsabil.ms2.entities.*;
import com.elsabil.ms2.repositories.AnneeRepository;
import com.elsabil.ms2.repositories.AnneeScolaireRepository;
import com.elsabil.ms2.repositories.NiveauRepository;
import com.elsabil.ms2.services.AnneeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annees")
public class AnneeController {

    @Autowired
    private AnneeService anneeService;

    @Autowired
    private AnneeScolaireRepository anneeScolaireRepository;

    @Autowired
    private AnneeRepository anneeRepository;

    @Autowired
    private NiveauRepository niveauRepository;

    @Autowired
    public AnneeController(AnneeService anneeService) {
        this.anneeService = anneeService;
    }

    @PostMapping("/{anneeScolaireId}/{niveauId}")
    public ResponseEntity<Annee> ajouterAnnee(@RequestBody Annee annee,
                                              @PathVariable("anneeScolaireId") Long anneeScolaireId,
                                              @PathVariable("niveauId") Long niveauId) throws Exception {
        Annee anneeAjoutee = anneeService.ajouterAnnee(annee, anneeScolaireId, niveauId);
        return new ResponseEntity<>(anneeAjoutee, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnee(@PathVariable Long id) {
        anneeService.deleteAnnee(id);
    }

    @GetMapping
    public ResponseEntity<List<Annee>> findAllAnnees() {
        return ResponseEntity.ok(anneeService.getAllAnnees());
    }

    @GetMapping("/{id}")
    public Annee getAnneeById(@PathVariable Long id) throws Exception {
        return anneeService.getAnneeById(id);
    }

    @PatchMapping("{anneeId}/{anneeScolaireId}/{niveauId}")
    public ResponseEntity<Annee> updateAnnee(@RequestBody Annee nouvelleAnnee,
                                             @PathVariable("anneeId") Long anneeId,
                                             @PathVariable("anneeScolaireId") Long anneeScolaireId,
                                             @PathVariable("niveauId") Long niveauId) throws Exception {
        AnneeScolaire anneeScolaire = anneeScolaireRepository.findById(anneeScolaireId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        Niveau niveau = niveauRepository.findById(niveauId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());
        Annee annee = anneeRepository.findById(anneeId).orElseThrow(() -> new ChangeSetPersister.NotFoundException());


        annee.setNiveau(niveau);
        annee.setAnneeScolaire(anneeScolaire);

        anneeService.updateAnnee(nouvelleAnnee, anneeId);
        return new ResponseEntity<>(annee, HttpStatus.CREATED);
    }


    @GetMapping("/{anneeId}/groupes")
    public List<Groupe> getGroupeByAnnee(@PathVariable Long anneeId) {
        Annee annee = anneeRepository.findById(anneeId).orElse(null);
        List<Groupe> groupes = annee.getGroupes();
        return groupes;
    }

    @GetMapping("/{anneeId}/cours")
    List<Cours> getCoursByAnnee(@PathVariable Long anneeId) {
        Annee annee = anneeRepository.findById(anneeId).orElse(null);
        List<Cours> cours = annee.getCours();
        return cours;
    }
}
