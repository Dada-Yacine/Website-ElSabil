package com.elsabil.ms2.repositories;

import com.elsabil.ms2.entities.Niveau;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NiveauRepository extends JpaRepository <Niveau, Long> {
}
