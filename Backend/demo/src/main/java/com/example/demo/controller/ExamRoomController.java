package com.example.demo.controller;

import com.example.demo.entity.ExamRoom;
import com.example.demo.service.ExamRoomService;
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
        return examRoomService.getExamRoomById(id);
    }

    @PostMapping
    public ExamRoom createExamRoom(@RequestBody ExamRoom examRoom) {
        return examRoomService.createExamRoom(examRoom);
    }

    @PutMapping("/{id}")
    public ExamRoom updateExamRoom(@PathVariable Integer id, @RequestBody ExamRoom examRoomDetails) {
        return examRoomService.updateExamRoom(id, examRoomDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteExamRoom(@PathVariable Integer id) {
        examRoomService.deleteExamRoom(id);
    }
}
