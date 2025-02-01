package com.example.demo.service;

import com.example.demo.entity.Department;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User registerUser(String name,String email,String password, Role role,Department department ){
        if(userRepository.findByEmail(email).isPresent()){
            throw new RuntimeException("Email already exisits!");
        }
        User user=new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));//hash password
        user.setRole(role);
        user.setDepartment(department);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Integer id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setPassword(userDetails.getPassword()); // Make sure to hash it
            user.setRole(userDetails.getRole());
            user.setDepartment(userDetails.getDepartment());
            user.setIsActive(userDetails.getIsActive());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}
