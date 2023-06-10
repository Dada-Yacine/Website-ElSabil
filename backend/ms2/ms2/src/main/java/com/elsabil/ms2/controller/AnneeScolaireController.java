package com.elsabil.ms2.controller;

import com.elsabil.ms2.entities.AnneeScolaire;
import com.elsabil.ms2.services.AnneeScolaireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/annees-scolaires")
public class AnneeScolaireController {
    private AnneeScolaireService anneeScolaireService; // Injectez ou instanciez le anneeScolaireService approprié

    @Autowired
    public AnneeScolaireController(AnneeScolaireService anneeScolaireService) {
        this.anneeScolaireService = anneeScolaireService;
    }

    @PostMapping
    public ResponseEntity<AnneeScolaire> ajouterAnneeScolaire(@RequestBody AnneeScolaire anneeScolaire) {
        AnneeScolaire anneeScolaireAjoutee = anneeScolaireService.ajouterAnneeScolaire(anneeScolaire);
        return new ResponseEntity<>(anneeScolaireAjoutee, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<AnneeScolaire>> findAllAnneesScolaires () {
        return ResponseEntity.ok(anneeScolaireService.getAllAnneeScolaires());
    }

    @GetMapping("/{id}")
    public AnneeScolaire getAnneeScolaireById(@PathVariable Long id) throws Exception {
        return anneeScolaireService.getAnneeScolaireById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAnneeScolaire(@PathVariable Long id) {
        anneeScolaireService.deleteAnneeScolaire(id);
    }

    @PatchMapping("/{id}")
    public void updateAnneeScoalire(@PathVariable Long id, @RequestBody AnneeScolaire anneeScolaire) throws Exception {
        anneeScolaireService.updateAnneeScolaire(id,anneeScolaire);
    }
}
