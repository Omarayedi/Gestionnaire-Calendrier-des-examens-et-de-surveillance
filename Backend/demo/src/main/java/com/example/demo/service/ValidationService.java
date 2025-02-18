package com.example.demo.service;

import com.example.demo.entity.Exam;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ValidationRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ValidationService {
    @Autowired
    private final ValidationRepository validationRepository;
    @Autowired
    private final ExamRepository examRepository;
    @Autowired
    private final UserRepository userRepository;



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

    public boolean notificationCanBeSend(Exam exam) {
        List<Validation> validation=validationRepository.findByExamId(exam);
        int c=0;
        for (Validation v : validation) {
            if (v.getStatus().equals(ValidationStatus.VALIDE)) {
                c++;
                }
            }
        return c==2;
    }
    
    @Transactional
    public Validation createValidation(Validation validation) {
        if (validation.getExamId() == null || validation.getExamId().getExamId() == null) {
            throw new IllegalArgumentException("Exam must be provided with a valid ID.");
        }

        if (validation.getValidatedBy() == null || validation.getValidatedBy().getUserId() == null) {
            throw new IllegalArgumentException("User must be provided with a valid ID.");
        }

        if (validation.getStatus() == null) {
            throw new IllegalArgumentException("Validation status must be provided.");
        }

        Exam exam = examRepository.findById(validation.getExamId().getExamId())
                .orElseThrow(() -> new IllegalArgumentException("Exam not found with ID: " + validation.getExamId().getExamId()));
        
        User user = userRepository.findByUserId(validation.getValidatedBy().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + validation.getValidatedBy().getUserId()));

        if (!user.getRole().equals(Role.DIRECTEUR) && !user.getRole().equals(Role.CHEF) ) {
            throw new IllegalArgumentException("Only users with the 'Directeur and chef' role can be validate.");
        }
        if (user.getRole().equals(Role.CHEF) && user.getDepartment().getName()!=exam.getDepartment().getName()){
            throw new IllegalArgumentException("Only chef de department "+exam.getDepartment().getName() +"can validate this exam.");
        }
        if (validationRepository.existsByValidatedByAndExamId(user, exam)) {
            throw new IllegalArgumentException("This user has already validated this exam.");
        }
 

        validation.setExamId(exam);
        validation.setValidatedBy(user);        

        validationRepository.save(validation);
        return validation;

    }

    @Transactional
    public Validation updateValidation(Integer id, Validation validation) {
        return validationRepository.findByValidationId(id).map(existingValidation -> {
            User user = userRepository.findByUserId(validation.getValidatedBy().getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
            Exam exam = examRepository.findById(validation.getExamId().getExamId())
                .orElseThrow(() -> new IllegalArgumentException("Exam not found"));
            
            if (!user.getRole().equals(Role.DIRECTEUR) && !user.getRole().equals(Role.CHEF)) {
                throw new IllegalArgumentException("Only users with the 'Directeur' or 'Chef' role can validate.");
            }
            
            if (user.getRole().equals(Role.CHEF) && !user.getDepartment().getName().equals(exam.getDepartment().getName())) {
                throw new IllegalArgumentException("Only the chef of department " + exam.getDepartment().getName() + " can validate this exam.");
            }
            
            if (validationRepository.existsByValidatedByAndExamId(user, exam)) {
                throw new IllegalArgumentException("This user has already validated this exam.");
            }
    
            existingValidation.setExamId(exam);
            existingValidation.setValidatedBy(user);
            existingValidation.setStatus(validation.getStatus());
            existingValidation.setComments(validation.getComments());

            return validationRepository.save(existingValidation);
        }).orElseThrow(() -> new IllegalArgumentException("Validation not found with id: " + id));
    }

    
    

    

    public void deleteValidation(Long id) {
        validationRepository.deleteById(id);
    }

}
