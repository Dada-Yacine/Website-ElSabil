package com.elsabil.ms2.repositories;

import com.elsabil.ms2.entities.Annee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnneeRepository extends JpaRepository <Annee, Long> {
}
