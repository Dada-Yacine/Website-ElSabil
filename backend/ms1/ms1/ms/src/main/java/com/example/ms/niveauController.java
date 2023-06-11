package com.example.ms;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class niveauController {
    @Autowired
    private NiveauRepository NiveauRepository;
@Autowired
private AnneeRepository AnneeRepository;



    @GetMapping("/niveau")
    public List<niveau> getNiveaux() {
        System.out.println(NiveauRepository.findAll());
        return  NiveauRepository.findAll();
    }
     public void niveau(){
         System.out.println(NiveauRepository.findAll());
     }
    @GetMapping("/{niveauId}/annees")
    @Transactional
    public List<annee> getAnneesByNiveau(@PathVariable Long niveauId) {
        niveau niveau = NiveauRepository.findById(niveauId).orElse(null);
        if (niveau != null) {
            List<annee> annees = niveau.getAnnees();
            System.out.println(annees);
            return annees;
        } else {
            return Collections.emptyList();
        }
    }

    @GetMapping("/{anneeId}/groupes")
    @Transactional
    public List<groupe> getGroupeByAnnee(@PathVariable Long anneeId) {
       annee annee = AnneeRepository.findById(anneeId).orElse(null);
        if (annee != null) {
            List<groupe> groupes = annee.getGroups();
            System.out.println(groupes);
            return groupes;
        } else {
            return Collections.emptyList();
        }}
    @GetMapping("/{anneeId}/cours")
    @Transactional
    public List<cours> getCoursByAnnee(@PathVariable Long anneeId) {
        annee annee = AnneeRepository.findById(anneeId).orElse(null);
        if (annee != null) {
            List<cours> cours = annee.getCours();
           System.out.println(cours);
            return cours;
        } else {
            return Collections.emptyList();
        }}
}
