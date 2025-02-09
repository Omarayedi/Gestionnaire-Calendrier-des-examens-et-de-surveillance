package com.example.demo.controller;

import com.example.demo.entity.ExamRoom;
import com.example.demo.service.ExamRoomService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exam-rooms")
public class ExamRoomController {

    private final ExamRoomService examRoomService;

    public ExamRoomController(ExamRoomService examRoomService) {
        this.examRoomService = examRoomService;
    }


    @GetMapping
    public List<ExamRoom> getAllExamRooms() {
        return examRoomService.getAllExamRooms();
    }


    @GetMapping("/{id}")
    public Optional<ExamRoom> getExamRoomById(@PathVariable Integer id) {
        return Optional.of(examRoomService.getExamRoomById(id));
    }


    @PostMapping
    public ResponseEntity<?> createExamRoom(@RequestBody ExamRoom examRoom) {
        try {
            ExamRoom savedExamRoom = examRoomService.createExamRoom(examRoom);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedExamRoom);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }
    

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExamRoom(@PathVariable int id, @RequestBody ExamRoom examRoomDetails) {
        try {
            return ResponseEntity.ok(examRoomService.updateExamRoom(id, examRoomDetails));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Exam room not found with id: " + id);
        }
    }
    
    @DeleteMapping("/{id}")
    public void deleteExamRoom(@PathVariable Integer id) {
        examRoomService.deleteExamRoom(id);
    }
}
