package com.example.demo.repository;

import com.example.demo.entity.ExamRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExamRoomRepository extends JpaRepository<ExamRoom, Integer> {
    List<ExamRoom> findByExamId(Integer examId);
    List<ExamRoom> findByRoomId(Integer roomId);
}
