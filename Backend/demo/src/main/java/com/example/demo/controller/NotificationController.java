package com.example.demo.controller;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import com.example.demo.entity.NotificationType;
import com.example.demo.entity.User;
import com.example.demo.service.NotificationService;

import lombok.AllArgsConstructor;

import com.example.demo.repository.UserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
@AllArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final UserRepository userRepository;


    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Optional<Notification> getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable User userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @GetMapping("/status/{status}")
    public List<Notification> getNotificationsByStatus(@PathVariable NotificationStatus status) {
        return notificationService.getNotificationsByStatus(status);
    }

    @PostMapping
    public ResponseEntity<String> createNotification(@RequestBody Map<String, Object> notificationMap) {
        
            System.out.println("ScheduleLog saved for notification ID: ");
            // Extract fields from the map
            Object userObject = notificationMap.get("user"); // Extract user object
            String message = (String) notificationMap.get("message");
            String typeStr = (String) notificationMap.get("type");
    
            // Validate required fields
            if (userObject == null || message == null || message.trim().isEmpty() || typeStr == null) {
                return ResponseEntity.badRequest().body("Missing or invalid fields");
            }
    
            // Convert userObject into a User instance
            User user;
            if (userObject instanceof Map) {
                // Manually map the object to a User instance
                @SuppressWarnings("unchecked")
                Map<String, Object> userMap = (Map<String, Object>) userObject;
                Integer userId = (Integer) userMap.get("id"); // Ensure "id" is an integer
                System.out.println("Extracted userId: " + userId); // Debug log
    
                // Fetch the user from the database
                user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));
            } else {
                return ResponseEntity.badRequest().body("Invalid user format");
            }
    
            // Convert the type string to the NotificationType enum
            NotificationType type;
            try {
                type = NotificationType.valueOf(typeStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().body("Invalid notification type: " + typeStr);
            }
    
            // Create and save the notification
            notificationService.createNotification(user, message, type);
            return ResponseEntity.ok().body("Notification ajoutée avec succès");
    }

    @PutMapping("/{id}")
    public Notification updateNotification(@PathVariable Integer id, @RequestBody Notification notificationDetails) {
        return notificationService.updateNotification(id, notificationDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable Integer id) {
        notificationService.deleteNotification(id);
    }
}

