package com.elsabil.ms2.controller;


import com.elsabil.ms2.DTO.CoursDto;
import com.elsabil.ms2.entities.Annee;
import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.repositories.AnneeRepository;
import com.elsabil.ms2.repositories.CoursRepository;
import com.elsabil.ms2.services.CoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @Autowired
    private CoursRepository coursRepository;


    @Autowired
    private AnneeRepository anneeRepository;

    @Autowired
    public CoursController(CoursService coursService) {
        this.coursService = coursService;
    }

    @PostMapping("/{anneeId}")
    public ResponseEntity<Cours> ajouterCours(@RequestBody Cours cours,
                                              @PathVariable("anneeId") Long anneeId) throws Exception {
        Cours coursAjoutee = coursService.ajouterCours(cours,anneeId);
        return new ResponseEntity<>(coursAjoutee, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Cours>> findAllCours () {
        return ResponseEntity.ok(coursService.getAllCours());
    }

    @GetMapping("/{id}")
    public Cours getCoursById(@PathVariable Long id) throws Exception {
        return coursService.getCoursById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCours(@PathVariable Long id) {
        coursService.deleteCours(id);
    }

    @PutMapping ("/{coursId}/{anneeId}")
    public ResponseEntity<Cours> updateCours(@RequestBody Cours nouveauCours,
                                             @PathVariable("coursId") Long coursId,
                                             @PathVariable("anneeId")Long anneId) throws Exception {


        coursService.updateCours(nouveauCours,coursId,anneId);

        return new ResponseEntity<>(nouveauCours, HttpStatus.CREATED);
    }

}