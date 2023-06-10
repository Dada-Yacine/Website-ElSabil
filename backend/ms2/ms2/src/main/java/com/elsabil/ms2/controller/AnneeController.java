package com.elsabil.ms2.controller;

import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.services.AnneeService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Annee>> findAllAnnees () {
        return ResponseEntity.ok(anneeService.getAllAnnees());
    }

    @GetMapping("/{id}")
    public Annee getAnneeById(@PathVariable Long id) throws Exception {
        return anneeService.getAnneeById(id);
    }

    @PatchMapping("/{anneeScolaireId}/{niveauId}")
    public ResponseEntity<Annee> updateAnnee(@RequestBody Annee annee,
                                              @PathVariable("anneeScolaireId") Long anneeScolaireId,
                                              @PathVariable("niveauId") Long niveauId) throws Exception {
        Annee anneeAjoutee = anneeService.updateAnnee(annee, anneeScolaireId, niveauId);
        return new ResponseEntity<>(anneeAjoutee, HttpStatus.CREATED);
    }

}
