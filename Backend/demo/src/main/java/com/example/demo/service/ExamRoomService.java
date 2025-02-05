package com.example.demo.service;

import com.example.demo.entity.ExamRoom;
import com.example.demo.repository.ExamRoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamRoomService {

    private final ExamRoomRepository examRoomRepository;

    public ExamRoomService(ExamRoomRepository examRoomRepository) {
        this.examRoomRepository = examRoomRepository;
    }

    public List<ExamRoom> getAllExamRooms() {
        return examRoomRepository.findAll();
    }

    public Optional<ExamRoom> getExamRoomById(Integer id) {
        return examRoomRepository.findById(id);
    }

    public ExamRoom createExamRoom(ExamRoom examRoom) {
        return examRoomRepository.save(examRoom);
    }

    public ExamRoom updateExamRoom(Integer id, ExamRoom examRoomDetails) {
        return examRoomRepository.findById(id).map(examRoom -> {
            examRoom.setExam(examRoomDetails.getExam());
            examRoom.setRoom(examRoomDetails.getRoom());
            return examRoomRepository.save(examRoom);
        }).orElseThrow(() -> new RuntimeException("Exam Room not found"));
    }

    public void deleteExamRoom(Integer id) {
        examRoomRepository.deleteById(id);
    }
}
