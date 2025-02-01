package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "exam_rooms")
public class ExamRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer examRoomId;

    @Column(nullable = false)
    private Integer examId; // Référence à l'examen (FK)

    @Column(nullable = false)
    private Integer roomId; // Référence à la salle (FK)

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Integer getExamRoomId() {
        return examRoomId;
    }

    public void setExamRoomId(Integer examRoomId) {
        this.examRoomId = examRoomId;
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
