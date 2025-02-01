package com.example.demo.controller;

import com.example.demo.entity.Invigilator;
import com.example.demo.service.InvigilatorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invigilators")
public class InvigilatorController {

    private final InvigilatorService invigilatorService;

    public InvigilatorController(InvigilatorService invigilatorService) {
        this.invigilatorService = invigilatorService;
    }

    @GetMapping
    public List<Invigilator> getAllInvigilators() {
        return invigilatorService.getAllInvigilators();
    }

    @PostMapping
    public Invigilator createInvigilator(@RequestBody Invigilator invigilator) {
        return invigilatorService.createInvigilator(invigilator);
    }
}
