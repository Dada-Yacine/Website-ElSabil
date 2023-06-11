package com.example.demo.Aggregate;

import com.example.demo.Command.AjouterUserCommand;
import com.example.demo.Events.UserAjouteEvent;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.springframework.stereotype.Component;

import static org.axonframework.modelling.command.AggregateLifecycle.apply;

@Component
public class AjouterUserCommandHandler {
    private final CommandGateway commandGateway;

    public AjouterUserCommandHandler(CommandGateway commandGateway) {
        this.commandGateway = commandGateway;
    }

    @CommandHandler
    public void handle(AjouterUserCommand command) {
        apply(new UserAjouteEvent(command.getId(), command.getNom(), command.getPrenom(), command.getRole()));
    }
}
