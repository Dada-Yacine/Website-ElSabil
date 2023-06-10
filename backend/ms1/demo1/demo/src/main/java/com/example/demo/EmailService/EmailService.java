package com.example.demo.EmailService;

import org.springframework.core.env.Environment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private Environment env;

    public void sendPasswordResetEmail(String recipientEmail, String token) {

        String subject = "Réinitialisation de votre mot de passe";
       // String resetUrl = env.getProperty("http://localhost:9040/api/eset-password?token=");
        String resetUrl = env.getProperty("reset.url");
        String message = "Bonjour,\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant: "
                + resetUrl + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientEmail);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }

}

/*@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
@Autowired
    private Environment env;

    @Autowired
    public EmailService(JavaMailSender mailSender, Environment env) {
        this.mailSender = mailSender;
        this.env = env;
    }

    public void sendPasswordResetEmail(String recipientEmail, String token) {

        String subject = "Réinitialisation de votre mot de passe";
        String message = "Bonjour,\n\nPour réinitialiser votre mot de passe, veuillez cliquer sur le lien suivant: "
                + env.getProperty("http://localhost:9040/reset-password?token=") + "/resetPassword?token=" + token;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(recipientEmail);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }

}
*/