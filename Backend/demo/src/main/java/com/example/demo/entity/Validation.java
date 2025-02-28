package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "validations")
@NoArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Validation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer validationId;

    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exam_id") 
    @JsonIgnore
    private Exam examId; // Référence à l'examen (FK)

    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id") 
    private User validatedBy; // Référence à l'utilisateur validant (FK)

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

    public Exam getExamId() {
        return examId;
    }

    public void setExamId(Exam examId) {
        this.examId = examId;
    }

    public User getValidatedBy() {
        return validatedBy;
    }

    public void setValidatedBy(User validatedBy) {
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
