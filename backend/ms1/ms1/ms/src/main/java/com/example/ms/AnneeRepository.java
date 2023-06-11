package com.example.ms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource

public interface AnneeRepository extends JpaRepository<annee, Long> {
}
