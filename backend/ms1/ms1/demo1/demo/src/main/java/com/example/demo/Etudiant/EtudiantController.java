package com.example.demo.Etudiant;

import com.example.demo.Command.AjouterUserCommand;
import com.example.demo.LoginDomain.Login;
import com.example.demo.Loginrepository.LoginRepository;
import com.example.demo.Command.ModifierUserCommand;
import com.example.demo.Command.SupprimerUserCommand;
import com.example.demo.ResourceNotFoundException;
import io.netty.util.concurrent.CompleteFuture;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;



import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@RestController
@RequestMapping("/api/etudiants")
@CrossOrigin(origins = "http://localhost:4200")
public class EtudiantController {
    @Autowired
    private EtudiantRepository etudiantRepository;
@Autowired
private LoginRepository loginRepository;
    @Autowired
    private CommandGateway commandGateway;

    @PostMapping("ajoutetudiant")
    public Etudiant ajouterEtudiant(@RequestBody Etudiant etudiant) {
      commandGateway.send(new AjouterUserCommand(etudiant.getId(), etudiant.getNom(), etudiant.getPrenom(), etudiant.getRole()));
        Etudiant nouvelEtudiant = etudiantRepository.save(etudiant);
        System.out.println(nouvelEtudiant.getGroupe());
        // Créer un nouvel objet Login
        Login login = new Login();

        login.setId(etudiant.getId());
        login.setUsername(etudiant.getEmail());  // Utilisez l'e-mail de l'étudiant comme nom d'utilisateur
        login.setPassword(etudiant.getMotDePasse());  // Utilisez le mot de passe de l'étudiant
        login.setActive(etudiant.getActive());
login.setRole(etudiant.getRole());
login.setUser(nouvelEtudiant);
nouvelEtudiant.setCompte(login);

        // Sauvegarder le login dans la base de données
        loginRepository.save(login);
        etudiantRepository.save(nouvelEtudiant);
        return nouvelEtudiant;
    }
    @GetMapping("student")
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }


    @DeleteMapping("/{id}")
    public void supprimerEtudiant(@PathVariable Long id,@RequestParam String role) {
        // Send the command to delete the user
        commandGateway.send(new SupprimerUserCommand(id,role));

        // Retrieve the etudiant entity by ID
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Etudiant not found with ID: " + id));

        // Retrieve the associated login entity
        Login login = etudiant.getCompte();

        // Delete the etudiant entity
        etudiantRepository.deleteById(id);

        // Delete the associated login entity
        loginRepository.delete(login);
    }
    @PatchMapping("/{id}")
    public Etudiant modifierEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiantModifie) {

        Etudiant etudiantExist = etudiantRepository.findById(id).orElse(null);

        if (etudiantExist != null) {
         commandGateway.send(new ModifierUserCommand(etudiantModifie.getId(), etudiantModifie.getNom(), etudiantModifie.getPrenom(),etudiantModifie.getRole()));
            // Vérifiez chaque attribut modifié et mettez à jour l'étudiant
            if (etudiantModifie.getNom() != null) {
                etudiantExist.setNom(etudiantModifie.getNom());
            }
            if (etudiantModifie.getPrenom() != null) {
                etudiantExist.setPrenom(etudiantModifie.getPrenom());
            }
            if (etudiantModifie.getDateNaissance() != null) {
                etudiantExist.setDateNaissance(etudiantModifie.getDateNaissance());}

                etudiantExist.getAdresse().setWilaya(etudiantModifie.getAdresse().getWilaya());
            etudiantExist.getAdresse().setVille(etudiantModifie.getAdresse().getVille());
            etudiantExist.getAdresse().setRue(etudiantModifie.getAdresse().getRue());




            if (etudiantModifie.getEmail() != null) {
                etudiantExist.setEmail(etudiantModifie.getEmail());
            }
            if (etudiantModifie.getNumeroTelephone() != null) {
                etudiantExist.setNumeroTelephone(etudiantModifie.getNumeroTelephone());
            }
            if (etudiantModifie.getMotDePasse() != null) {
                etudiantExist.setMotDePasse(etudiantModifie.getMotDePasse());
            }
            if (etudiantModifie.getActive() != null) {
                etudiantExist.setActive(etudiantModifie.getActive());
            }
            if (etudiantModifie.getRole() != null) {
                etudiantExist.setRole(etudiantModifie.getRole());
            }

                etudiantExist.setNiveau(etudiantModifie.getNiveau());


                etudiantExist.setAnnee(etudiantModifie.getAnnee());


                etudiantExist.setGroupe(etudiantModifie.getGroupe());





            Etudiant nouvelEtudiant = etudiantRepository.save(etudiantExist);
            Login login=loginRepository.findLoginById(id);
            login.setActive(nouvelEtudiant.getActive());
            login.setUsername(nouvelEtudiant.getEmail());
            loginRepository.save(login);

            return nouvelEtudiant;
        } else {
            throw new IllegalArgumentException("Étudiant non trouvé avec l'ID : " + id);
        }
    }

    @GetMapping("/{id}")
    public Etudiant getEtudiantById(@PathVariable Long id) {
        return etudiantRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Étudiant non trouvé avec l'ID : " + id));
    }
    @GetMapping("/users/{idU}")
    public  userDTO  getUsers(@PathVariable("idU") Long idU)
    {
        Etudiant user= etudiantRepository.findById(idU).get();
        Login compte=user.getCompte();
        userDTO user1=new userDTO();
        user1.setId(user.getId());
        user1.setNom(user.getNom());
        user1.setPrenom(user.getPrenom());
        user1.setEmail(user.getEmail());
        user1.setNumeroTelephone(user.getNumeroTelephone());
        user1.setAdresse(user.getAdresse());
        user1.setRole(user.getRole());
        user1.setDatenaissance(user.getDateNaissance());
        user1.setEmail(compte.getUsername());
        user1.setCompteEmail(compte.getUsername());
        user1.setComptePassword(compte.getPassword());




        return  user1;
    }

    @PutMapping("/{userId}/password")
    public  void updatePassword(@PathVariable Long userId, @RequestParam String oldPassword,
                                @RequestParam String newPassword) {

        Etudiant user = etudiantRepository.findEtudiantsById(userId);
        Login compte = user.getCompte();
        //Compte compte= compteRepository.findByEmailAndAndPassword(email,oldPassword);
        if (compte != null && compte.getPassword().equals(oldPassword)) {
            compte.setPassword(String.valueOf(newPassword));
            loginRepository.save(compte);
            user.setMotDePasse(String.valueOf(newPassword));
            etudiantRepository.save(user);


        } else {
            throw new RuntimeException("Wrong username or old password");
        }
    }


    @PutMapping("/users/{userId}/phone")
    public Etudiant updateUserPhone(@PathVariable Long userId, @RequestBody String newPhone) {
        Etudiant user = etudiantRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setNumeroTelephone(String.valueOf(newPhone));

        return etudiantRepository.save(user);
    }
    @PutMapping("/users/{userId}/address")
    public Etudiant updateUserAddress(@PathVariable Long userId, @RequestBody Adresse updatedAddress) {
        Etudiant user = etudiantRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        if (user.getAdresse() == null) {
            user.setAdresse(new Adresse());
        }



        user.getAdresse().setWilaya(updatedAddress.getWilaya());
        user.getAdresse().setVille(updatedAddress.getVille());
        user.getAdresse().setRue(updatedAddress.getRue());


        return etudiantRepository.save(user);
    }
    @PostMapping("/{userId}/profilePicture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable Long userId, @RequestParam("file") MultipartFile file) {
        try {
            String filename = "user_" + userId + ".jpg";
            String directoryPath = System.getProperty("user.dir") + "/profilePictures/";
            Path path = Paths.get(directoryPath + filename);

            // Create the directory if it doesn't exist
            Files.createDirectories(path.getParent());

            Files.write(path, file.getBytes());

            return new ResponseEntity<>("Profile picture uploaded successfully.", HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading profile picture.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/profilePicture/{userId}")
    public ResponseEntity<Resource> getProfilePicture(@PathVariable Long userId) {
        System.out.println("Fetching profile picture for user with ID " + userId);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Access-Control-Allow-Origin", "*");
        // Retrieve the profile picture file path from the server
        String profilePicturePath = "profilePictures/user_" + userId + ".jpg";
        System.out.println("Profile picture path: " + profilePicturePath);

        try {
            // Create a Resource object for the profile picture file
            Resource fileResource = new UrlResource(new File(profilePicturePath).toURI());
            if (!fileResource.exists()) {
                System.out.println("Profile picture file does not exist");
                // Return a 404 response if the profile picture file does not exist
                return ResponseEntity.notFound().build();
            }
            System.out.println("Returning profile picture file");
            // headers.add("X-Console-Log", "Profile picture for user " + userId + " retrieved successfully");

            // Return the profile picture file as a ResponseEntity
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + fileResource.getFilename() + "\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(fileResource);
        } catch (MalformedURLException e) {
            // Handle the exception
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("etudiant/niveau/{idNiveau}")public List<Etudiant> getEtudiantsByIdNiveau(@PathVariable Long idNiveau) {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantByIdniveau(idNiveau);    List<Etudiant> etudiantsEtudiant = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {
            if (etudiant.getRole().equals("etudiant")) {            etudiantsEtudiant.add(etudiant);
            }    }
        return etudiantsEtudiant;
    }
    @GetMapping("etudiant/groupe/{idGroupe}")
    public List<Etudiant> getEtudiantsByIdGroupe(@PathVariable Long idGroupe) {    List<Etudiant> etudiants = etudiantRepository.findEtudiantByIdgroupe(idGroupe);
        List<Etudiant> etudiantsEtudiant = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {        if (etudiant.getRole().equals("etudiant")) {
            etudiantsEtudiant.add(etudiant);        }
        }
        return etudiantsEtudiant;}

    @GetMapping("etudiant/annee/{idAnnee}")public List<Etudiant> getEtudiantsByIdAnnee(@PathVariable Long idAnnee) {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantByIdannee(idAnnee);    List<Etudiant> etudiantsEtudiant = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {
            if (etudiant.getRole().equals("etudiant")) {            etudiantsEtudiant.add(etudiant);
            }    }
        return etudiantsEtudiant;
    }@GetMapping("enseignant/niveau/{idNiveau}")
    public List<Etudiant> getEnseignantsByIdNiveau(@PathVariable Long idNiveau) {    List<Etudiant> etudiants = etudiantRepository.findEtudiantByIdniveau(idNiveau);
        List<Etudiant> etudiantsEtudiant = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {        if (etudiant.getRole().equals("enseignant")) {
            etudiantsEtudiant.add(etudiant);        }
        }
        return etudiantsEtudiant;}
    @GetMapping("enseignant/annee/{idAnnee}")
    public List<Etudiant> getEnseignantsByIdAnnee(@PathVariable Long idAnnee) {    List<Etudiant> etudiants = etudiantRepository.findEtudiantByIdannee(idAnnee);
        List<Etudiant> etudiantsEtudiant = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {        if (etudiant.getRole().equals("enseignant")) {
            etudiantsEtudiant.add(etudiant);        }
        }
        return etudiantsEtudiant;}

}
