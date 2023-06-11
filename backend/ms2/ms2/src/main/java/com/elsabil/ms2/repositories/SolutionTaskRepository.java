package com.elsabil.ms2.repositories;


import com.elsabil.ms2.entities.SolutionTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource

public interface SolutionTaskRepository extends JpaRepository<SolutionTask,Long> {
}
