package com.example.demo.controller;

import com.example.demo.entity.ExamStudent;
import com.example.demo.service.ExamStudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/exam-students")
public class ExamStudentController {

    private final ExamStudentService examStudentService;

    public ExamStudentController(ExamStudentService examStudentService) {
        this.examStudentService = examStudentService;
    }

    @GetMapping
    public List<ExamStudent> getAllExamStudents() {
        return examStudentService.getAllExamStudents();
    }

    @PostMapping
    public ExamStudent createExamStudent(@RequestBody ExamStudent examStudent) {
        return examStudentService.createExamStudent(examStudent);
    }
}
