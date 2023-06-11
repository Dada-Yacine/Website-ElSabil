package com.example.demo;

import com.example.demo.Aggregate.UserAggregate;
import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.security.NoTypePermission;
import org.axonframework.axonserver.connector.AxonServerConfiguration;
import org.axonframework.axonserver.connector.AxonServerConnectionManager;
import org.axonframework.axonserver.connector.event.axon.AxonServerEventStore;
import org.axonframework.commandhandling.CommandBus;
import org.axonframework.commandhandling.SimpleCommandBus;
import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.commandhandling.gateway.DefaultCommandGateway;
import org.axonframework.config.Configuration;
import org.axonframework.config.DefaultConfigurer;
import org.axonframework.eventhandling.EventBus;
import org.axonframework.eventhandling.SimpleEventBus;
import org.axonframework.eventsourcing.AggregateSnapshotter;
import org.axonframework.eventsourcing.EventSourcingRepository;
import org.axonframework.eventsourcing.Snapshotter;
import org.axonframework.eventsourcing.eventstore.EventStore;
import org.axonframework.modelling.command.Repository;
import org.axonframework.serialization.Serializer;
import org.axonframework.serialization.xml.XStreamSerializer;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;

@org.springframework.context.annotation.Configuration

public class AxonConfig {

   /* @Bean
    public Repository<UserAggregate> userRepository(EventStore eventStore) {
        EventSourcingRepository<UserAggregate> repository = EventSourcingRepository.builder(UserAggregate.class)
                .eventStore(eventStore)
                .build();

        return repository;
    }

    @Bean
    public CommandBus commandBus() {
        SimpleCommandBus commandBus = SimpleCommandBus.builder().build();
        // commandBus.registerDispatchInterceptor(new BeanValidationInterceptor<>()); // Optional: Bean validation interceptor for command validation

        return commandBus;
    }

    @Bean
    public CommandGateway commandGateway(CommandBus commandBus) {
        return DefaultCommandGateway.builder().commandBus(commandBus).build();
    }

    @Bean
    public EventBus eventBus() {
        return SimpleEventBus.builder().build();
    }

    @Bean
    public AxonServerConnectionManager axonServerConnectionManager() {
        return AxonServerConnectionManager.builder()
                .axonServerConfiguration(AxonServerConfiguration.builder()
                        .servers("localhost:8124")
                        .build())
                .build();
    }

    @Bean
    public EventStore eventStore(AxonServerConnectionManager axonServerConnectionManager) {
        return AxonServerEventStore.builder()
                .platformConnectionManager(axonServerConnectionManager)

                .build();
    }



    @Bean
    public Serializer eventSerializer() {
        XStreamSerializer serializer = XStreamSerializer.builder().build();
        serializer.getXStream().addPermission(NoTypePermission.NONE);
        return serializer;
    }

    @Bean
    public Configuration axonConfiguration(EventBus eventBus, EventStore eventStore, CommandBus commandBus) {
        return DefaultConfigurer.defaultConfiguration()
                .configureEventStore(c -> eventStore)
                .configureCommandBus(c -> commandBus)
                .start();
    }

    @Bean
    public AxonServerConfiguration axonServerConfiguration() {
        return AxonServerConfiguration.builder()
                .servers("localhost:8124") // Remplacez par l'adresse réelle d'Axon Server
                .build();
    }

    @Bean
    public Snapshotter aggregateSnapshotter(@Qualifier("axonConfiguration") Configuration configuration) {
        return AggregateSnapshotter.builder()
                .eventStore(configuration.eventStore())
                .build();
    }

    */
   @Bean
   public XStream xStream() {
       XStream xStream = new XStream();

       xStream.allowTypesByWildcard(new String [] {
               "com.example.demo.**"
       });
       return xStream;
   }
}
