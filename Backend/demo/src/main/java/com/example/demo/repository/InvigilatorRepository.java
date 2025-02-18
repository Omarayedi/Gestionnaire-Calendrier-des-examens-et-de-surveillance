package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.Invigilator;
import com.example.demo.entity.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InvigilatorRepository extends JpaRepository<Invigilator, Integer> {

    boolean existsByUserAndExam(User user, Exam exam);

    List<Invigilator> findByExam(Exam exam);
}

