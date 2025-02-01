package com.example.demo.service;

import com.example.demo.entity.Exam;
import com.example.demo.repository.ExamRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExamService {

    private final ExamRepository examRepository;

    public ExamService(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Integer id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        return examRepository.save(exam);
    }

    public Exam updateExam(Integer id, Exam examDetails) {
        return examRepository.findById(id).map(exam -> {
            exam.setSubject(examDetails.getSubject());
            exam.setDepartmentId(examDetails.getDepartmentId());
            exam.setExamDate(examDetails.getExamDate());
            exam.setStartTime(examDetails.getStartTime());
            exam.setEndTime(examDetails.getEndTime());
            exam.setDifficulty(examDetails.getDifficulty());
            exam.setCoefficient(examDetails.getCoefficient());
            exam.setIsDuplicate(examDetails.getIsDuplicate());
            return examRepository.save(exam);
        }).orElseThrow(() -> new RuntimeException("Exam not found"));
    }

    public void deleteExam(Integer id) {
        examRepository.deleteById(id);
    }
}
