package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "validations")
public class Validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer validationId;

    @Column(nullable = false)
    private Integer examId; // Référence à l'examen (FK)

    @Column(nullable = false)
    private Integer validatedBy; // Référence à l'utilisateur validant (FK)

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ValidationStatus status; // Statut de validation

    @Column(columnDefinition = "TEXT")
    private String comments; // Commentaires

    @Column(nullable = false)
    private LocalDateTime validationDate;

    @PrePersist
    protected void onCreate() {
        this.validationDate = LocalDateTime.now();
    }

    // Getters et Setters
    public Integer getValidationId() {
        return validationId;
    }

    public void setValidationId(Integer validationId) {
        this.validationId = validationId;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public Integer getValidatedBy() {
        return validatedBy;
    }

    public void setValidatedBy(Integer validatedBy) {
        this.validatedBy = validatedBy;
    }

    public ValidationStatus getStatus() {
        return status;
    }

    public void setStatus(ValidationStatus status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public LocalDateTime getValidationDate() {
        return validationDate;
    }
}
