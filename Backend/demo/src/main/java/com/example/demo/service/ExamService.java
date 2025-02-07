package com.example.demo.service;

import com.example.demo.entity.Department;
import com.example.demo.entity.Exam;
import com.example.demo.entity.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.ExamRepository;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ExamService {

    @Autowired
    private final DepartmentRepository departmentRepository;
    @Autowired
    private final ExamRepository examRepository;


    public List<Exam> getAllExams() {
        return examRepository.findAll();
    }

    public Optional<Exam> getExamById(Integer id) {
        return examRepository.findById(id);
    }

    public Exam createExam(Exam exam) {
        if (exam.getDepartment() != null && exam.getDepartment().getDepartmentId() != null) {
            // Fetch the User (head) by ID
            Department dep = departmentRepository.findById(exam.getDepartment().getDepartmentId())
                    .orElseThrow(() -> new IllegalArgumentException("Department not found with name " + exam.getDepartment().getDepartmentId()));
            exam.setDepartment(dep); // Assign the head to the exam
        } else {
            exam.setDepartment(null); // If no head, set it as null
        }
        return examRepository.save(exam); // Save the exam
    }

    public Exam updateExam(Integer examId, Exam updatedExam) {
        return examRepository.findById(examId).map(existingExam -> {
            existingExam.setSubject(updatedExam.getSubject());
            existingExam.setExamDate(updatedExam.getExamDate());
            existingExam.setStartTime(updatedExam.getStartTime());
            existingExam.setEndTime(updatedExam.getEndTime());
            existingExam.setDifficulty(updatedExam.getDifficulty());
            existingExam.setCoefficient(updatedExam.getCoefficient());
            existingExam.setIsDuplicate(updatedExam.getIsDuplicate());
    
            // Update Department only if provided
            if (updatedExam.getDepartment() != null && updatedExam.getDepartment().getDepartmentId() != null) {
                Department department = departmentRepository.findById(updatedExam.getDepartment().getDepartmentId())
                        .orElseThrow(() -> new IllegalArgumentException("Department not found"));
                existingExam.setDepartment(department);
            }
            return examRepository.save(existingExam);
        }).orElseThrow(() -> new IllegalArgumentException("Exam not found with id " + examId));
    }

    public void deleteExam(Integer id) {
        examRepository.deleteById(id);
    }
}
