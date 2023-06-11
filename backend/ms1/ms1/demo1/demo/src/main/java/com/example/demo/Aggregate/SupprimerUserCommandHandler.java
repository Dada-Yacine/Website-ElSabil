package com.example.demo.Aggregate;

import com.example.demo.Command.SupprimerUserCommand;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.modelling.command.AggregateNotFoundException;
import org.axonframework.modelling.command.Repository;
import org.springframework.stereotype.Component;

@Component
public class SupprimerUserCommandHandler {
    private final Repository<UserAggregate> userRepository;

    public SupprimerUserCommandHandler(Repository<UserAggregate> userRepository) {
        this.userRepository = userRepository;
    }

    @CommandHandler
    public void handle(SupprimerUserCommand command) throws AggregateNotFoundException {
        userRepository.load(command.getId().toString()).execute(aggregate -> aggregate.handle(command));
    }
}