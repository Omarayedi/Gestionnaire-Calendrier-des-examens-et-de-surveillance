package com.example.demo.service;

import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;
import com.example.demo.repository.ValidationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ValidationService {

    private final ValidationRepository validationRepository;

    public ValidationService(ValidationRepository validationRepository) {
        this.validationRepository = validationRepository;
    }

    public List<Validation> getAllValidations() {
        return validationRepository.findAll();
    }

    public Optional<Validation> getValidationById(Integer id) {
        return validationRepository.findByValidationId(id);
    }

    public List<Validation> getValidationsByExamId(Exam examId) {
        return validationRepository.findByExamId(examId);
    }

    public List<Validation> getValidationsByUserId(User userId) {
        return validationRepository.findByValidatedBy(userId);
    }

    public List<Validation> getValidationsByStatus(ValidationStatus status) {
        return validationRepository.findByStatus(status);
    }

    public Validation createValidation(Validation validation) {
        return validationRepository.save(validation);
    }

    public Validation updateValidation(Integer id, Validation validationDetails) {
        return validationRepository.findByValidationId(id).map(validation -> {
            validation.setExamId(validationDetails.getExamId());
            validation.setValidatedBy(validationDetails.getValidatedBy());
            validation.setStatus(validationDetails.getStatus());
            validation.setComments(validationDetails.getComments());
            return validationRepository.save(validation);
        }).orElseThrow(() -> new RuntimeException("Validation not found"));
    }

    public void deleteValidation(Long id) {
        validationRepository.deleteById(id);
    }
}
