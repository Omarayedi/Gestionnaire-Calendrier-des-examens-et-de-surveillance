package com.example.demo.repository;

import com.example.demo.entity.Exam;
import com.example.demo.entity.ExamStudent;
import com.example.demo.entity.Student;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamStudentRepository extends JpaRepository<ExamStudent, Integer> {

    boolean existsByExamAndStudent(Exam exam, Student student);

    Optional<ExamStudent> findByExamAndStudent(Exam exam, Student student);

    boolean existsByExam(Exam exam);

    List<ExamStudent> findByExam(Exam exam);

}

