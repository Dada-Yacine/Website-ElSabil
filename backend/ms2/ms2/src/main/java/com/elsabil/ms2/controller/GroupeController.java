package com.elsabil.ms2.controller;


import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.entities.Groupe;
import com.elsabil.ms2.repositories.GroupeRepository;
import com.elsabil.ms2.services.CoursService;
import com.elsabil.ms2.services.GroupeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/groupes")
public class GroupeController {

    @Autowired
    private GroupeService groupeService;

    @Autowired
    private GroupeRepository groupeRepository;


    @Autowired
    public GroupeController(GroupeService groupeService) {
        this.groupeService = groupeService;
    }

    @PostMapping("/{anneeId}")
    public ResponseEntity<Groupe> ajouterGroupe(@RequestBody Groupe groupe,
                                                @PathVariable("anneeId") Long anneeId) throws Exception {
        Groupe groupeAjoutee = groupeService.ajouterGroupe(groupe,anneeId);
        return new ResponseEntity<>(groupeAjoutee, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Groupe>> findAllGroupe () {
        return ResponseEntity.ok(groupeService.getAllGroupe());
    }

    @DeleteMapping("/{id}")
    public void deleteGroupe(@PathVariable Long id) {
        groupeService.deleteGroupe(id);
    }

    @GetMapping("/{id}")
    public Groupe getGroupeById(@PathVariable Long id) throws Exception {
        return groupeService.getGroupeById(id);
    }

    @PutMapping ("/{groupeId}/{anneeId}")
    public ResponseEntity<Groupe> updateCours(@RequestBody Groupe nouveauGroupe,
                                             @PathVariable("groupeId") Long groupeId,
                                             @PathVariable("anneeId")Long anneId) throws Exception {


        groupeService.updateGroupe(nouveauGroupe,groupeId,anneId);

        return new ResponseEntity<>(nouveauGroupe, HttpStatus.CREATED);
    }

    @GetMapping("/students/{groupeId}")
    public List<Long> getEtudiantsByIdGroupe (@PathVariable Long groupeId) throws ChangeSetPersister.NotFoundException {
        Groupe groupe = groupeRepository.findById(groupeId).orElseThrow(ChangeSetPersister.NotFoundException::new);
        return groupe.getEtudiantsIds();
    }

}
