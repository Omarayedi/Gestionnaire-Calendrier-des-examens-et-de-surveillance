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
    
        // Check if the user is eligible to be a department head
        if (!head.getRole().equals("CHEF")) { 
            throw new IllegalArgumentException("User with role " + head.getRole() + " cannot be assigned as the department head. A department head must have the role 'CHEF'.");
        }
    
        // Assign the head to the department
        department.setHead(head);
    
        return departmentRepository.save(department);
    }
    

    @Transactional
    public Department updateDepartment(Long id, Department updatedDepartment) {
        // Fetch the existing department
        Department existingDepartment = departmentRepository.findByDepartmentId(id)
                .orElseThrow(() -> new IllegalArgumentException("Department not found with id " + id));
    
        // Update the department name
        existingDepartment.setName(updatedDepartment.getName());
    
        // Handle head update
        if (updatedDepartment.getHead() != null && updatedDepartment.getHead().getUserId() != null) {
            long headId = updatedDepartment.getHead().getUserId();
            
            User head = userRepository.findByUserId(headId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with id " + headId));
    
            // Validate if the user is eligible to be a department head
            if (!head.getRole().equals("CHEF")) {
                throw new IllegalArgumentException("User with role " + head.getRole() + " cannot be assigned as the department head. A department head must have the role 'CHEF'.");
            }
    
            existingDepartment.setHead(head);
        } else {
            existingDepartment.setHead(null); // Allow removing the head if set to null
        }
    
        return departmentRepository.save(existingDepartment);
    }
    public void deleteDepartment(Integer id) {
        departmentRepository.deleteById(id);
    }
}
