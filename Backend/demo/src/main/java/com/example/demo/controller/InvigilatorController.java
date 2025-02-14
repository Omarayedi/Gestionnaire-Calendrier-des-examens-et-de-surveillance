package com.example.demo.controller;

import com.example.demo.entity.Invigilator;
import com.example.demo.service.InvigilatorService;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invigilators")
@AllArgsConstructor
public class InvigilatorController {

    private final InvigilatorService invigilatorService;


    @GetMapping
    public List<Invigilator> getAllInvigilators() {
        return invigilatorService.getAllInvigilators();
    }

    @PostMapping
    public ResponseEntity<?> createInvigilator(@RequestBody Invigilator invigilator) {
        try {
            Invigilator savedInvigilator = invigilatorService.createInvigilator(invigilator);
            return new ResponseEntity<>(savedInvigilator, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> updateInvigilator(@PathVariable Integer id, @RequestBody Invigilator invigilatorDetails) {
        try {
            Invigilator updatedInvigilator = invigilatorService.updateInvigilator(id, invigilatorDetails);
            return new ResponseEntity<>(updatedInvigilator, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
}

}
