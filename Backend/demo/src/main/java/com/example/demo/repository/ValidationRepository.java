package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;

import java.util.List;

public interface ValidationRepository extends JpaRepository<Validation, Long> {
    List<Validation> findByExamId(Exam exam);
    List<Validation> findByValidatedBy(User user);
    List<Validation> findByStatus(ValidationStatus status);
}
