package com.example.demo.Aggregate;

import com.example.demo.Command.ModifierUserCommand;
import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.modelling.command.AggregateNotFoundException;
import org.axonframework.modelling.command.Repository;
import org.springframework.stereotype.Component;

@Component
public class ModifierUserCommandHandler {
    private final Repository<UserAggregate> userRepository;

    public ModifierUserCommandHandler(Repository<UserAggregate> userRepository) {
        this.userRepository = userRepository;
    }

    @CommandHandler
    public void handle(ModifierUserCommand command) throws AggregateNotFoundException {
        userRepository.load(command.getId().toString()).execute(aggregate -> {
            try {
                aggregate.handle(command);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });
    }
}
