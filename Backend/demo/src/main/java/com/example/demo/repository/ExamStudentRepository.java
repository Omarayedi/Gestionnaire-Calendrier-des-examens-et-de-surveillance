package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.ExamStudent;
import com.example.demo.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamStudentRepository extends JpaRepository<ExamStudent, Integer> {

    boolean existsByExamAndStudent(Exam exam, Student student);

}

