package com.example.demo.service;

import com.example.demo.entity.ExamStudent;
import com.example.demo.repository.ExamStudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamStudentService {

    private final ExamStudentRepository examStudentRepository;

    public ExamStudentService(ExamStudentRepository examStudentRepository) {
        this.examStudentRepository = examStudentRepository;
    }

    public List<ExamStudent> getAllExamStudents() {
        return examStudentRepository.findAll();
    }

    public ExamStudent createExamStudent(ExamStudent examStudent) {
        return examStudentRepository.save(examStudent);
    }
}

