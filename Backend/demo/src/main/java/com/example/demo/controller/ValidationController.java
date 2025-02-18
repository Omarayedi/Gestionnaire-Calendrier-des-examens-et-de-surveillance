package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;
import com.example.demo.service.ValidationService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/validations")
@AllArgsConstructor
public class ValidationController {


    private final ValidationService validationService;


    @GetMapping
    public List<Validation> getAllValidations() {
        return validationService.getAllValidations();
    }

    @GetMapping("/{id}")
    public Optional<Validation> getValidationById(@PathVariable Integer id) {
        return validationService.getValidationById(id);
    }

    @GetMapping("/exam/{examId}")
    public List<Validation> getValidationsByExamId(@PathVariable Exam examId) {
        return validationService.getValidationsByExamId(examId);
    }

    @GetMapping("/user/{userId}")
    public List<Validation> getValidationsByUserId(@PathVariable User userId) {
        return validationService.getValidationsByUserId(userId);
    }

    @GetMapping("/status/{status}")
    public List<Validation> getValidationsByStatus(@PathVariable ValidationStatus status) {
        return validationService.getValidationsByStatus(status);
    }

    @PostMapping
    public ResponseEntity<?> createValidation(@RequestBody Validation invigilator) {
        try {
            Validation savedInvigilator = validationService.createValidation(invigilator);
            return new ResponseEntity<>(savedInvigilator, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }   

    @PutMapping("/{id}")
    public ResponseEntity<?> updateValidation(@PathVariable Integer id, @RequestBody Validation validation) {
        try {
            Validation updatedValidation = validationService.updateValidation(id, validation);
            return ResponseEntity.ok(updatedValidation);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating validation.");
        }
    }


    @DeleteMapping("/{id}")
    public void deleteValidation(@PathVariable Long id) {
        validationService.deleteValidation(id);
    }
}
