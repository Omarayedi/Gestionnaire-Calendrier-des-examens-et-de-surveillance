package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;

import java.util.List;

public interface ValidationRepository extends JpaRepository<Validation, Integer> {
    List<Validation> findByExamId(Integer examId);
    List<Validation> findByValidatedBy(Integer userId);
    List<Validation> findByStatus(ValidationStatus status);
}
