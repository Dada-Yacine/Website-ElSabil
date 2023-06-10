package com.elsabil.ms2.controller;

import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.entities.Niveau;
import com.elsabil.ms2.repositories.NiveauRepository;
import com.elsabil.ms2.services.NiveauService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/niveaux")
@RequiredArgsConstructor
public class NiveauController {

    @Autowired
    private NiveauService niveauService;


    @Autowired
    private NiveauRepository niveauRepository;


    @PostMapping
    public void saveNiveau(@RequestBody Niveau niveau) {
        niveauService.ajouterNiveau(niveau);
    }

    @GetMapping
    public ResponseEntity<List<Niveau>> findAllNiveaux() {
        return ResponseEntity.ok(niveauService.getAllNiveaux());
    }

    @GetMapping("/{id}")
    public Niveau getNiveauById(@PathVariable Long id) throws Exception {
        return niveauService.getNiveauById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteNiveau(@PathVariable Long id) {
        niveauService.deleteNiveau(id);
    }

    @PatchMapping("/{id}")
    public void updateNiveau(@PathVariable Long id, @RequestBody Niveau niveau) throws Exception {
        niveauService.updateNiveau(id, niveau);
    }


    @GetMapping("/{niveauId}/annees")
    public List<Annee> getAnneesByNiveau(@PathVariable Long niveauId) {
        Niveau niveau = niveauRepository.findById(niveauId).orElse(null);
        List<Annee> annees = niveau.getAnnees();
        System.out.println(annees);
        return annees;

    }

}
