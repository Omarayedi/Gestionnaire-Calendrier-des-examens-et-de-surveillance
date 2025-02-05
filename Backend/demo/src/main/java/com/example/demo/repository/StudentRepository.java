package com.example.demo.repository;

import com.example.demo.entity.Student;
import com.example.demo.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Integer> {
    Optional<Student> findByUser(User user);
    List<Student> findByProgram(String program);
}
