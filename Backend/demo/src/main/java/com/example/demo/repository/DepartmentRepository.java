package com.example.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.*;


public interface DepartmentRepository extends JpaRepository<Department, Integer> {
    Optional<Department> findByDepartmentId(Long id);
}

