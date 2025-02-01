package com.example.demo.controller;

import com.example.demo.entity.Exam;
import com.example.demo.service.ExamService;
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
    public Exam createExam(@RequestBody Exam exam) {
        return examService.createExam(exam);
    }

    @PutMapping("/{id}")
    public Exam updateExam(@PathVariable Integer id, @RequestBody Exam examDetails) {
        return examService.updateExam(id, examDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Integer id) {
        examService.deleteExam(id);
    }
}
