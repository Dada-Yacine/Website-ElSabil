package com.elsabil.ms2.repositories;


import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.entities.Etudiant;
import com.elsabil.ms2.entities.tasks;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Collection;
import java.util.List;


@RepositoryRestResource
public interface TaskRepository extends JpaRepository<tasks,Long> {
    @Query("SELECT t FROM tasks t WHERE t.course = :course AND t.course.etudiants IN :students")
    List<tasks> findByCourseAndStudents(@Param("course") Cours course, @Param("students") Collection<Etudiant> students);
}
