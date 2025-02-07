package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.entity.Validation;
import com.example.demo.entity.ValidationStatus;
import com.example.demo.service.ValidationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/validations")
public class ValidationController {

    private final ValidationService validationService;

    public ValidationController(ValidationService validationService) {
        this.validationService = validationService;
    }

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
    public Validation createValidation(@RequestBody Validation validation) {
        return validationService.createValidation(validation);
    }

    @PutMapping("/{id}")
    public Validation updateValidation(@PathVariable Integer id, @RequestBody Validation validationDetails) {
        return validationService.updateValidation(id, validationDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteValidation(@PathVariable Long id) {
        validationService.deleteValidation(id);
    }
}
