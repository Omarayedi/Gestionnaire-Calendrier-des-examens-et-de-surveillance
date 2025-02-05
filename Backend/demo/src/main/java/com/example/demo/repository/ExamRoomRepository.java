package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.ExamRoom;
import com.example.demo.entity.Room;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRoomRepository extends JpaRepository<ExamRoom, Integer> {
    List<ExamRoom> findByExam(Exam exam);
    List<ExamRoom> findByRoom(Room room);
}
