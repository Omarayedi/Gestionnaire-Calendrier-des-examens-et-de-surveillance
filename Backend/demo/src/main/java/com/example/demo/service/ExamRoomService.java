package com.example.demo.service;

import com.example.demo.entity.Exam;
import com.example.demo.entity.ExamRoom;
import com.example.demo.entity.Room;
import com.example.demo.repository.ExamRepository;
import com.example.demo.repository.ExamRoomRepository;
import com.example.demo.repository.RoomRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ExamRoomService {

    private final ExamRoomRepository examRoomRepository;
    private final ExamRepository examRepository;
    private final RoomRepository roomRepository;

    public List<ExamRoom> getAllExamRooms() {
        return examRoomRepository.findAll();
    }

    public ExamRoom getExamRoomById(Integer id) {
        return examRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ExamRoom not found with ID: " + id));
    }
    
    public LocalTime findTheEndTimeInTheRoom(List<ExamRoom> examRooms) {
        if (examRooms.isEmpty()) {
            throw new IllegalArgumentException("Exam list is empty.");
        }
    
        LocalTime maxTime = examRooms.get(0).getExam().getEndTime() ;
    
        for (ExamRoom e : examRooms) {
            LocalTime Time = e.getExam().getEndTime();
            if (Time.isAfter(maxTime)) {
                maxTime = Time;
            }
        }
        return maxTime;
    }
    
    @Transactional
    public ExamRoom createExamRoom(ExamRoom examRoom) {
        if (examRoom.getExam() == null || examRoom.getExam().getExamId() == null ||
            examRoom.getRoom() == null || examRoom.getRoom().getRoomId() == null) {
            throw new IllegalArgumentException("Exam and Room must be provided with valid IDs.");
        }
    
        int examId = examRoom.getExam().getExamId();
        int roomId = examRoom.getRoom().getRoomId();
    
        Exam exam = examRepository.findById(examId)
                .orElseThrow(() -> new IllegalArgumentException("Exam not found with ID: " + examId));
    
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + roomId));
    
        // Check if the room is occupied
        if (!room.getIsAvailable()) {
            List<ExamRoom> examRooms = examRoomRepository.findByRoom(room);
            LocalTime maxTime = findTheEndTimeInTheRoom(examRooms);
    
            LocalTime currentExamStartTime = exam.getStartTime();
    
            if (!currentExamStartTime.isAfter(maxTime)) {
                throw new IllegalArgumentException("Room with ID " + roomId + " is already occupied until "+maxTime);
            }
        }
    
        // Check if the exam is already assigned
        if (examRoomRepository.existsByExam(exam)) {
            throw new IllegalArgumentException("Exam with ID " + examId + " is already assigned to a room.");
        }
    
        examRoom.setExam(exam);
        examRoom.setRoom(room);
        room.setIsAvailable(false);
        roomRepository.save(room);
    
        return examRoomRepository.save(examRoom);
    }

    @Transactional
    public ExamRoom updateExamRoom(Integer id, ExamRoom updatedExamRoom) {
        ExamRoom existingExamRoom = examRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ExamRoom not found with ID: " + id));

        Room previousRoom = existingExamRoom.getRoom();
        Room newRoom = null;
        Exam newExam = null;

        // Update Exam if provided
        if (updatedExamRoom.getExam() != null && updatedExamRoom.getExam().getExamId() != null) {
            newExam = examRepository.findById(updatedExamRoom.getExam().getExamId())
                    .orElseThrow(() -> new IllegalArgumentException("Exam not found with ID: " + updatedExamRoom.getExam().getExamId()));

            // Check if the exam is already assigned to another room (excluding the current one)
            if (examRoomRepository.existsByExam(newExam) && !newExam.equals(existingExamRoom.getExam())) {
                throw new IllegalArgumentException("Exam with ID " + newExam.getExamId() + " is already assigned to a room.");
            }
            
            existingExamRoom.setExam(newExam);
        }

        // If a new room is provided, fetch it and check availability
        if (updatedExamRoom.getRoom() != null && updatedExamRoom.getRoom().getRoomId() != null) {
            newRoom = roomRepository.findById(updatedExamRoom.getRoom().getRoomId())
                    .orElseThrow(() -> new IllegalArgumentException("Room not found with ID: " + updatedExamRoom.getRoom().getRoomId()));

            // Check room availability using the same logic from `createExamRoom`
            List<ExamRoom> examRooms = examRoomRepository.findByRoom(newRoom);

            // Exclude the current exam if it's already in this room (to avoid self-check)
            examRooms.removeIf(er -> er.getExam().getExamId().equals(existingExamRoom.getExam().getExamId()));

            if (!examRooms.isEmpty()) { 
                LocalTime maxTime = findTheEndTimeInTheRoom(examRooms); // Ensure correct method name
                LocalTime currentExamStartTime = newExam.getStartTime();

                if (!currentExamStartTime.isAfter(maxTime)) {
                    throw new IllegalArgumentException("Room with ID " + newRoom.getRoomId() + " is already occupied until " + maxTime);
                }
            }
        }

        // If room is changing, update availability
        if (newRoom != null && !previousRoom.getRoomId().equals(newRoom.getRoomId())) {
            previousRoom.setIsAvailable(true); // Restore previous room
            newRoom.setIsAvailable(false); // Mark new room as occupied
            existingExamRoom.setRoom(newRoom);
        }

        // Save changes
        roomRepository.save(previousRoom);
        if (newRoom != null) { 
            roomRepository.save(newRoom);
        }

        return examRoomRepository.save(existingExamRoom);
    }

    
    
    @Transactional
    public void deleteExamRoom(Integer id) {
        ExamRoom examRoom = examRoomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("ExamRoom not found with ID: " + id));

        // Free up the room
        Room room = examRoom.getRoom();
        if (room != null) {
            if(examRoomRepository.findByRoom(room).size()==1){
                room.setIsAvailable(true);
                roomRepository.save(room);
            }
        }
        examRoomRepository.deleteById(id);
    }
}
