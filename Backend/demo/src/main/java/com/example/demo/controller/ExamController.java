package com.example.demo.controller;

import com.example.demo.entity.Department;
import com.example.demo.entity.Exam;
import com.example.demo.service.ExamService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public Optional<Exam> getExamById(@PathVariable Integer id) {
        return examService.getExamById(id);
    }

    @PostMapping
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        try {
            Exam createdExam = examService.createExam(exam);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExam);
        }catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create exam.");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateExam(@PathVariable int id, @RequestBody Exam exam) {
        try {
            Exam updatedexam = examService.updateExam(id, exam);
            if (updatedexam == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Department not found with id: " + id);
            }
            return ResponseEntity.ok(updatedexam);
        }catch (IllegalArgumentException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to update department.");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Integer id) {
        examService.deleteExam(id);
    }
}
