package com.example.demo.Aggregate;

import com.example.demo.Command.AjouterUserCommand;
import com.example.demo.Command.ModifierUserCommand;
import com.example.demo.Command.SupprimerUserCommand;
import com.example.demo.Events.UserAjouteEvent;
import com.example.demo.Events.UserModifieEvent;
import com.example.demo.Events.UserSupprimeEvent;
import lombok.NoArgsConstructor;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.modelling.command.AggregateRoot;
import org.axonframework.spring.stereotype.Aggregate;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;
import static org.axonframework.modelling.command.AggregateLifecycle.markDeleted;

@Aggregate
@NoArgsConstructor
public class UserAggregate {
    @AggregateIdentifier
    private Long id;
    private String nom;
    private String prenom;
    private String role;


    @CommandHandler
    public UserAggregate(AjouterUserCommand cmd) {
       AggregateLifecycle.apply(new UserAjouteEvent(cmd.getId(), cmd.getNom(), cmd.getPrenom(), cmd.getRole()));
    }
    @EventSourcingHandler
    public void on(UserAjouteEvent event) {
        this.id = event.getId();
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        this.role= event.getRole();
    }

    @CommandHandler
    public void handle(ModifierUserCommand cmd) throws  Exception {
       AggregateLifecycle.apply(new UserModifieEvent(cmd.getId(), cmd.getNom(), cmd.getPrenom(),cmd.getRole()));
    }
    @EventSourcingHandler
    public void on(UserModifieEvent event) {
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        this.role= event.getRole();
    }

    @CommandHandler
    public void handle(SupprimerUserCommand command) {
        AggregateLifecycle.apply(new UserSupprimeEvent(command.getId(),command.getRole()));
    }
    @EventSourcingHandler
    public void on(UserSupprimeEvent event) {
        // Marquer l'agrégat comme supprimé (peut être utilisé pour la logique de nettoyage supplémentaire)
        markDeleted();
    }

/* @AggregateIdentifier
    private Long id;
    private String nom;
    private String prenom;
    public UserAggregate() {
        // Constructeur par défaut requis par Axon
    }
    @CommandHandler
    public UserAggregate(AjouterUserCommand command) {
        apply(new UserAjouteEvent(command.getId(), command.getNom(), command.getPrenom()));
    }
    @EventSourcingHandler
    protected void on(UserAjouteEvent event) {
        this.id = event.getId();
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        // Traitez les autres champs de l'événement
    }
    @CommandHandler
    public void handle(ModifierUserCommand command) {
        apply(new UserModifieEvent(command.getId(), command.getNom(), command.getPrenom()));
    }

    @EventSourcingHandler
    protected void on(UserModifieEvent event) {
        this.nom = event.getNom();
        this.prenom = event.getPrenom();
        // Traitez les autres champs de l'événement
    }

    @CommandHandler
    public void handle(SupprimerUserCommand command) {
        apply(new UserSupprimeEvent(command.getId()));
    }

    @EventSourcingHandler
    protected void on(UserSupprimeEvent event) {
        // Traitement de la suppression de l'étudiant
        // ...
    }
    @CommandHandlerInterceptor
    public void commandHandlerInterceptor(CommandMessage<?> commandMessage, UnitOfWork unitOfWork, InterceptorChain interceptorChain) throws Exception {
        // Implement your command handler interceptor logic here
        // ...
        interceptorChain.proceed(); // Proceed with the command handling chain
    }
*/

    // Ajoutez des méthodes supplémentaires et des gestionnaires d'événements au besoin

}




