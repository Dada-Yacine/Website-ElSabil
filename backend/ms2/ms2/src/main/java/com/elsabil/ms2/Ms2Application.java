package com.elsabil.ms2;

import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.entities.Etudiant;
import com.elsabil.ms2.repositories.CoursRepository;
import com.elsabil.ms2.repositories.EtudiantRepository;
import com.elsabil.ms2.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication

public class Ms2Application  implements CommandLineRunner {
	@Autowired
	CoursRepository courseRepository;
	@Autowired
	TaskRepository taskRepository;
	@Autowired
	EtudiantRepository etudiantRepository;

	public static void main(String[] args) {
		SpringApplication.run(Ms2Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Etudiant etudiant1=new Etudiant(null,null,null);
		Etudiant etudiant2=new Etudiant(null,null,null);
		Etudiant etudiant3=new Etudiant(null,null,null);
		Etudiant etudiant4=new Etudiant(null,null,null);
		Etudiant etudiant5=new Etudiant(null,null,null);
		Etudiant etudiant6=new Etudiant(null,null,null);
		etudiantRepository.save(etudiant1);
		etudiantRepository.save(etudiant2);
		etudiantRepository.save(etudiant3);
		etudiantRepository.save(etudiant4);
		etudiantRepository.save(etudiant5);
		etudiantRepository.save(etudiant6);
		List<Etudiant> etudiants=new ArrayList<>();
		etudiants.add(etudiant1);
		etudiants.add(etudiant2);
		etudiants.add(etudiant3);
		List<Etudiant> etudiants1=new ArrayList<>();
		etudiants1.add(etudiant1);
		etudiants1.add(etudiant4);
		etudiants1.add(etudiant5);
		etudiants1.add(etudiant6);

		/*Cours courses=new Cours(null,"mathematique",5,1L,"mohammed","2019",null,null,etudiants);
		Cours courses1=new Cours(null,"PHYSIQUE",4,2L,"mohammed","2020",null,null,etudiants1);
		courseRepository.save(courses);
		courseRepository.save(courses1);*/

	}
}
