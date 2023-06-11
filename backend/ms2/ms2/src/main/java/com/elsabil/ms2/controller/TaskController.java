package com.elsabil.ms2.controller;

;
import com.elsabil.ms2.entities.Cours;
import com.elsabil.ms2.entities.Etudiant;
import com.elsabil.ms2.entities.SolutionTask;
import com.elsabil.ms2.entities.tasks;
import com.elsabil.ms2.repositories.CoursRepository;
import com.elsabil.ms2.repositories.EtudiantRepository;
import com.elsabil.ms2.repositories.SolutionTaskRepository;
import com.elsabil.ms2.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin(origins = "http://localhost:4200")

public class TaskController {
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private CoursRepository courseRepository;
    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private SolutionTaskRepository solutionTaskRepository;

    @PostMapping("/task")
    public tasks createTask(@RequestParam("file") MultipartFile file,
                            @RequestParam("name") String name,
                            @RequestParam("date") @DateTimeFormat(pattern = "dd/MM/yyyy") Date date,
                            @RequestParam("coursename") String courseName) throws IOException {
        Cours course = courseRepository.findByCoursNom(courseName)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));

        java.sql.Date sqlDate = new java.sql.Date(date.getTime());

        tasks task = new tasks();
        task.setName(name);
        task.setDate(sqlDate);
        task.setCourse(course);

        if (!file.isEmpty()) {
            String filePath = saveFileToDisk(file);
            task.setFilePath(filePath);
        }



        return taskRepository.save(task);
    }
    /*@GetMapping("/{etudiantId}/devoirs")
    public List<tasks> getDevoirsByEtudiantId(@PathVariable Long etudiantId) {
        Optional<Etudiant> etudiantOptional = etudiantRepository.findById(etudiantId);
        if (etudiantOptional.isPresent()) {
            Etudiant etudiant = etudiantOptional.get();
            return etudiant.getDevoirs();
        }
        return Collections.emptyList();
    }*/
    @GetMapping("/etudiant")
    public List<Etudiant> getEtudiant() {

        return etudiantRepository.findAll();
    }

    private String saveFileToDisk(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString();
        String directoryPath ="C:/tasksecole/";

        File directory = new File(directoryPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String filePath = directoryPath + fileName;
        Path destinationPath = Paths.get(filePath);

        Files.write(destinationPath, file.getBytes());

        return filePath;
    }

        @GetMapping("/{taskId}")
    public tasks getTask(@PathVariable Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));
    }
    @GetMapping("/{taskId}/course")
    public Cours getTaskCourse(@PathVariable Long taskId) {
        tasks task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        return task.getCourse();
    }
    @PutMapping("/{taskId}")
    public tasks updateTask(@PathVariable Long taskId, @RequestParam("file") MultipartFile file, @RequestParam("name") String name, @RequestParam("date") Date date, @RequestParam("coursename") String courseName) throws IOException {
        tasks task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        task.setName(name);
        task.setDate((java.sql.Date) date);

        Cours course = courseRepository.findByCoursNom(courseName)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found"));
        task.setCourse(course);

        if (!file.isEmpty()) {
            // Save the updated file to disk
            String filePath = saveFileToDisk(file);
            task.setFilePath(filePath);
        }

        return taskRepository.save(task);
    }



    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long taskId) {
        tasks task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        taskRepository.delete(task);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/{taskId}/download")
    public ResponseEntity<org.springframework.core.io.Resource> downloadTask(@PathVariable Long taskId) throws IOException {
        // Retrieve the task from the database
        tasks task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        // Get the file path from the task object
        String filePath = task.getFilePath();

        // Load the file resource using the resource loader
        org.springframework.core.io.Resource fileResource = resourceLoader.getResource("file:" + filePath);

        // Extract the filename from the file path
        String filename = filePath.substring(filePath.lastIndexOf("/") + 1);

        // Set the response headers
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename);

        // Build the ResponseEntity with the file resource and headers
        return ResponseEntity.ok()
                .headers(headers)
                .body((org.springframework.core.io.Resource) fileResource);
    }
    @GetMapping("/courses")
    public List<Cours> getAllCourses() {
        return courseRepository.findAll();
    }


    @GetMapping("/{id}/teacher")
    public List<Cours> getCoursesByTeacherId(@PathVariable Long id) {
        return  courseRepository.findByEnseignantId(id);

    }
    @GetMapping
    public List<tasks> getAllTasks() {
        return taskRepository.findAll();}



    @GetMapping("/students/{studentId}/tasks")
    public ResponseEntity<Map<Cours, List<tasks>>> getTasksForStudent(@PathVariable Long studentId) {
        Etudiant student = etudiantRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

        List<Cours> courses = student.getCours();

        Map<Cours, List<tasks>> courseTasksMap = new HashMap<>();

        for (Cours course : courses) {
            List<tasks> tasks = course.getTasks(); // Assuming the tasks are already loaded in the course entity
            courseTasksMap.put(course, tasks);
        }

        return ResponseEntity.ok(courseTasksMap);
    }
    @PostMapping("/{etudiantId}/devoirs/{devoirId}/solutions")
    public ResponseEntity<SolutionTask> addSolutionToDevoir(@PathVariable Long etudiantId, @PathVariable Long devoirId, @RequestParam("file") MultipartFile file) {
        // Get the Etudiant and Devoir from the repositories
        Etudiant etudiant = etudiantRepository.findById(etudiantId)
                .orElseThrow(() -> new ResourceNotFoundException("Etudiant not found"));

        tasks devoir = taskRepository.findById(devoirId)
                .orElseThrow(() -> new ResourceNotFoundException("Devoir not found"));

        // Create a new Solution
        SolutionTask solution = new SolutionTask();
        solution.setEtudiant(etudiant);
        solution.setDevoir(devoir);

        try {
            // Save the file to a specific location or store it in a database
            String filePath = saveFileToDisk(file);
            solution.setFilePathSolution(filePath);

            // Save the Solution
            solution = solutionTaskRepository.save(solution);

            return ResponseEntity.ok(solution);
        } catch (IOException e) {
            // Handle file saving error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}






