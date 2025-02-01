package com.example.demo.repository;

import com.example.demo.entity.Invigilator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvigilatorRepository extends JpaRepository<Invigilator, Integer> {
}

