package com.example.demo.controller;

import com.example.demo.dto.DepartmentDTO;
import com.example.demo.dto.ExamDTO;
import com.example.demo.entity.Exam;
import com.example.demo.service.ExamService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public ResponseEntity<List<ExamDTO>> getAllExams() {
        List<ExamDTO> exams = examService.getAllExams();
        return ResponseEntity.ok(exams);
    }

    @GetMapping("/{id}")
    public Optional<Exam> getExamById(@PathVariable Integer id) {
        return examService.getExamById(id);
    }

    @PostMapping
    public ResponseEntity<?> createExam(@RequestBody Exam exam) {
        try {
            Exam createdExam = examService.createExam(exam);
            return ResponseEntity.ok("Exam " +createdExam.getSubject()+ " created successfully.");
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
    public ResponseEntity<?> deleteExam(@PathVariable Integer id) {
        try {
            examService.deleteExam(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting exam");
        }
    }

}
