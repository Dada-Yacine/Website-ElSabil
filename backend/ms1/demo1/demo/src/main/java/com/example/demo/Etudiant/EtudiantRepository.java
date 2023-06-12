package com.example.demo.Etudiant;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository

public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {
    Etudiant findEtudiantsById(Long idU);
    List<Etudiant> findEtudiantByIdniveau(Long idniveau);
    List<Etudiant> findEtudiantByIdannee(Long idannee);
    List<Etudiant> findEtudiantByIdgroupe(Long idgroupe);



}
