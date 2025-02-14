package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.*;
import java.util.*;

public interface ValidationRepository extends JpaRepository<Validation, Long> {

    List<Validation> findByExamId(Exam exam);

    List<Validation> findByValidatedBy(User user);

    List<Validation> findByStatus(ValidationStatus status);

    Optional<Validation> findByValidationId(Integer validationId);

    long countByExamId(Exam exam);
    boolean existsByValidatedByAndExamId(User validatedBy, Exam examId);

    boolean existsByExamId(Exam exam);
}
