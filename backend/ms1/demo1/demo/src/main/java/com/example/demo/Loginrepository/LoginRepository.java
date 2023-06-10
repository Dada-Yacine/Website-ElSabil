package com.example.demo.Loginrepository;

import com.example.demo.LoginDomain.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
   // @Query("SELECT l.active FROM Login l WHERE l.username = :username AND l.password = :password")
    Login findByUsernameAndPassword(String username, String password);
    Login findByUsername(String username);
Login findLoginById(Long id);
    @Query("SELECT l.active FROM Login l WHERE l.username = :username")
   String findActiveByUsername(@Param("username") String username);

    @Modifying
    @Query("UPDATE Login c SET c.password = :newPassword WHERE c.id = :id")
    void updatePassword(@Param("id") Long id, @Param("newPassword") String newPassword);


}