package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Invigilators")
public class Invigilator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer invigilatorId;


    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id") 
    private User user;

    
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "exam_id") 
    private Exam exam;

    
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "room_id") 
    private Room room;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}

