package com.elsabil.ms2.repositories;


import com.elsabil.ms2.entities.AnneeScolaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnneeScolaireRepository extends JpaRepository<AnneeScolaire, Long> {
}
