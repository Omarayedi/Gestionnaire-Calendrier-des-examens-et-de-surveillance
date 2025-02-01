package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_students")
public class ExamStudent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer examStudentId;

    @Column(nullable = false)
    private Integer examId;

    @Column(nullable = false)
    private Integer studentId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private ExamStatus status;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Integer getExamStudentId() {
        return examStudentId;
    }

    public void setExamStudentId(Integer examStudentId) {
        this.examStudentId = examStudentId;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public ExamStatus getStatus() {
        return status;
    }

    public void setStatus(ExamStatus status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

