package com.example.demo.controller;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import com.example.demo.service.NotificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public Optional<Notification> getNotificationById(@PathVariable Integer id) {
        return notificationService.getNotificationById(id);
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getNotificationsByUserId(@PathVariable Integer userId) {
        return notificationService.getNotificationsByUserId(userId);
    }

    @GetMapping("/status/{status}")
    public List<Notification> getNotificationsByStatus(@PathVariable NotificationStatus status) {
        return notificationService.getNotificationsByStatus(status);
    }

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
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

