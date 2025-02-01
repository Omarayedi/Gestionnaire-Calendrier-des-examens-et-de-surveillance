package com.example.demo.service;

import com.example.demo.entity.Invigilator;
import com.example.demo.repository.InvigilatorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvigilatorService {

    private final InvigilatorRepository invigilatorRepository;

    public InvigilatorService(InvigilatorRepository invigilatorRepository) {
        this.invigilatorRepository = invigilatorRepository;
    }

    public List<Invigilator> getAllInvigilators() {
        return invigilatorRepository.findAll();
    }

    public Invigilator createInvigilator(Invigilator invigilator) {
        return invigilatorRepository.save(invigilator);
    }
}
