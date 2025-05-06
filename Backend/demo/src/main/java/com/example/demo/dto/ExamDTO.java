package com.example.demo.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public class ExamDTO {
    private Integer examId;
    private String subject;
    private String departmentName;
    private LocalDate examDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer difficulty;
    private Integer coefficient;

    public ExamDTO(Integer examId, String subject, String departmentName, LocalDate examDate, LocalTime startTime, LocalTime endTime, Integer difficulty, Integer coefficient) {
        this.examId = examId;
        this.subject = subject;
        this.departmentName = departmentName;
        this.examDate = examDate;
        this.startTime = startTime;
        this.endTime = endTime;
        this.difficulty = difficulty;
        this.coefficient = coefficient;
    }
    // getters and setters

    public Integer getExamId() {
        return examId;
    }

    public String getSubject() {
        return subject;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public LocalDate getExamDate() {
        return examDate;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public Integer getCoefficient() {
        return coefficient;
    }
    
}
