package com.elsabil.ms2.services;

import com.elsabil.ms2.entities.Niveau;
import com.elsabil.ms2.repositories.NiveauRepository; // Importez la classe NiveauRepository si elle existe
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NiveauService {


    private final NiveauRepository niveauRepository; // Injectez ou instanciez le niveauRepository approprié


    public Niveau ajouterNiveau(Niveau nouveauNiveau) {
        return niveauRepository.save(nouveauNiveau);
    }

    public List<Niveau> getAllNiveaux() {
        return niveauRepository.findAll();
    }


    public Niveau getNiveauById(Long niveauId) throws Exception {
        return niveauRepository.findById(niveauId)
                .orElseThrow(() -> new Exception("Niveau not found with ID: " + niveauId));
    }

    public void deleteNiveau(Long niveauId) {
        niveauRepository.deleteById(niveauId);
    }

    public void updateNiveau(Long niveauId, Niveau updatedNiveau) throws Exception {
        Niveau niveau = niveauRepository.findById(niveauId)
                .orElseThrow(() -> new Exception("Niveau not found with ID: " + niveauId));

        niveau.updateFrom(updatedNiveau);

        niveau.getAnnees().forEach(annee -> {
            annee.setNiveauNom(niveau.getNiveauNom());
        });
        niveauRepository.save(niveau);
    }
}
