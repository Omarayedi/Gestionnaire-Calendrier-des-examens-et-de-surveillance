package com.example.demo.service;

import com.example.demo.entity.Exam;
import com.example.demo.entity.ExamRoom;
import com.example.demo.entity.Room;
import com.example.demo.entity.User;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.ExamRoomRepository;
import com.example.demo.repository.RoomRepository;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExamRoomService {

    @Autowired
    private final ExamRoomRepository examRoomRepository;
    @Autowired
    private final ExamRepository examRepository;
    @Autowired
    private final RoomRepository roomRepository;



    public List<ExamRoom> getAllExamRooms() {
        return examRoomRepository.findAll();
    }

    public Optional<ExamRoom> getExamRoomById(Integer id) {
        return examRoomRepository.findById(id);
    }

    @Transactional
    public ExamRoom createExamRoom(ExamRoom examRoom) {
        if (examRoom.getExam() == null || examRoom.getExam().getExamId() == null || 
            examRoom.getRoom() == null || examRoom.getRoom().getRoomId() == null) {
            throw new IllegalArgumentException("Exam and Room must be provided with valid IDs.");
        }
    
        int examId = examRoom.getExam().getExamId();
        int roomId = examRoom.getRoom().getRoomId();
    
        // Fetch Exam
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found with id: " + examId));
    
        // Fetch Room
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + roomId));
    
        // Ensure the room is available
        if (!room.getIsAvailable()) {
            throw new IllegalArgumentException("Room with id " + roomId + " is already occupied.");
        }
    
        // Assign the exam and room
        examRoom.setExam(exam);
        examRoom.setRoom(room);
    
        // Mark the room as unavailable
        room.setIsAvailable(false);
        roomRepository.save(room); // Persist room availability change
    
        return examRoomRepository.save(examRoom);
    }
    


    public ExamRoom updateExamRoom(Integer id, ExamRoom updatedExamRoom) {
        
        ExamRoom existingExamRoom = examRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ExamRoom not found with ID: " + id));

        if (updatedExamRoom.getExam() != null && updatedExamRoom.getExam().getExamId() != null) {
            Exam exam = examRepository.findById(updatedExamRoom.getExam().getExamId())
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found with ID: " + updatedExamRoom.getExam().getExamId()));
            existingExamRoom.setExam(exam);
        }
    
        if (updatedExamRoom.getRoom() != null && updatedExamRoom.getRoom().getRoomId() != null) {
            Room existingRoom = roomRepository.findById(existingExamRoom.getRoom().getRoomId())
            .orElseThrow(() -> new IllegalArgumentException("Room not found with id: " + existingExamRoom.getRoom().getRoomId()));

            Room room = roomRepository.findById(updatedExamRoom.getRoom().getRoomId())
                    .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + updatedExamRoom.getRoom().getRoomId()));
            existingRoom.setIsAvailable(true);
            roomRepository.save(existingRoom);
            room.setIsAvailable(false);
        } 
        
        return examRoomRepository.save(existingExamRoom);
    }
    

    public void deleteExamRoom(Integer id) {
        examRoomRepository.deleteById(id);
    }
}
