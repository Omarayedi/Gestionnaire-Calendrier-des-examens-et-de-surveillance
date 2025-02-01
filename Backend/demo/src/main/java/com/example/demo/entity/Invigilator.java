package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Invigilators")
public class Invigilator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invigilatorId;

    @Column(nullable = false)
    private Integer userId;

    @Column(nullable = false)
    private Integer examId;

    @Column(nullable = false)
    private Integer roomId;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Integer getInvigilatorId() {
        return invigilatorId;
    }

    public void setInvigilatorId(Integer invigilatorId) {
        this.invigilatorId = invigilatorId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getExamId() {
        return examId;
    }

    public void setExamId(Integer examId) {
        this.examId = examId;
    }

    public Integer getRoomId() {
        return roomId;
    }

    public void setRoomId(Integer roomId) {
        this.roomId = roomId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

