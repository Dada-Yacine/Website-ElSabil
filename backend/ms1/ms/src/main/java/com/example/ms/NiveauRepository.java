package com.example.ms;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
@RepositoryRestResource

public interface NiveauRepository extends JpaRepository<niveau, Long> {
}
