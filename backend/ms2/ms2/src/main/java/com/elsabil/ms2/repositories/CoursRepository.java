package com.elsabil.ms2.repositories;

import com.elsabil.ms2.entities.Cours;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoursRepository extends JpaRepository<Cours, Long> {
}
