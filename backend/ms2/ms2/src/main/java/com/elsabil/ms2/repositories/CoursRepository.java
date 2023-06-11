package com.elsabil.ms2.repositories;

import com.elsabil.ms2.entities.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CoursRepository extends JpaRepository<Cours, Long> {
    Optional<Cours> findByCoursNom(String name);


    List<Cours> findByEnseignantId(Long idEnseignant);
}
