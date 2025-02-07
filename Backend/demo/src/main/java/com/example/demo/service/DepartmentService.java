package com.example.demo.service;

import com.example.demo.entity.Department;
import com.example.demo.entity.User;
import com.example.demo.repository.DepartmentRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();
    }

    @Transactional
    public Department createDepartment(Department department) {
        if (department.getHead() == null || department.getHead().getUserId() == null) {
            throw new IllegalArgumentException("Department head must be provided with a valid user ID.");
        }
    
        long headId = department.getHead().getUserId();
    
        // Fetch User (Head)
        User head = userRepository.findByUserId(headId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + headId));
    
        // Assign the head to the department
        department.setHead(head);
    
        return departmentRepository.save(department);
    }
    

    public Department updateDepartment(Long id, Department updatedDepartment) {
        // Fetch the existing department
        Department existingDepartment = departmentRepository.findByDepartmentId(id)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with id " + id));

        // Update fields
        existingDepartment.setName(updatedDepartment.getName());

        // Handle head update
        if (updatedDepartment.getHead() != null && updatedDepartment.getHead().getUserId() != null) {
            User head = userRepository.findByUserId(updatedDepartment.getHead().getUserId())
                    .orElseThrow(() -> new IllegalArgumentException("User not found with id " + updatedDepartment.getHead().getUserId()));
            existingDepartment.setHead(head);
        } else {
            existingDepartment.setHead(null); // Allow removing the head if set to null
        }

        return departmentRepository.save(existingDepartment);
    }
}
