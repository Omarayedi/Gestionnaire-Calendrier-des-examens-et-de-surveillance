package com.example.demo.service;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import com.example.demo.entity.NotificationType;
import com.example.demo.entity.ScheduleLog;
import com.example.demo.entity.User;
import com.example.demo.repository.NotificationRepository;
import com.example.demo.repository.ScheduleLogRepository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final ScheduleLogRepository scheduleLogRepository;

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(Integer id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> getNotificationsByUserId(User userId) {
        return notificationRepository.findByUser(userId);
    }

    public List<Notification> getNotificationsByStatus(NotificationStatus status) {
        return notificationRepository.findByStatus(status);
    }

    @Transactional // Ensure the entire operation is atomic
    public Notification createNotification(User receiver, String message, NotificationType type) {
        if (receiver == null) {
            throw new IllegalArgumentException("Receiver cannot be null");
        }

        if (message == null || message.trim().isEmpty()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }

        // Get the sender (the currently authenticated user from the token)
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User sender = (User) authentication.getPrincipal(); // Assuming the principal is a User object

        // Create and populate the Notification object
        Notification notification = new Notification();
        notification.setUser(receiver); // Receiver of the notification
        notification.setMessage(message);
        notification.setNotificationType(type);

        // Set default status to "envoyée" for the first creation
        notification.setStatus(NotificationStatus.ENVOYEE);

        // Save the notification
        Notification savedNotification = notificationRepository.save(notification);
        System.out.println("Notification saved with ID: " + savedNotification.getNotificationId()); // Debug log

        // Log the creation in schedule_logs (historique)
        ScheduleLog log = new ScheduleLog();
        log.setAction("Création");
        log.setDescription("Création d'une notification pour l'utilisateur: " + receiver.getName());
        log.setPerformedBy(sender); // The sender (who created/sent the notification)

        scheduleLogRepository.save(log); // Save the log entry
        System.out.println("ScheduleLog saved for notification ID: " + savedNotification.getNotificationId()); // Debug log


        return savedNotification;
    }

    public Notification updateNotification(Integer id, Notification notificationDetails) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setUser(notificationDetails.getUser());
            notification.setMessage(notificationDetails.getMessage());
            notification.setStatus(notificationDetails.getStatus());
            notification.setNotificationType(notificationDetails.getNotificationType());
            return notificationRepository.save(notification);
        }).orElseThrow(() -> new RuntimeException("Notification not found"));
    }

    public void deleteNotification(Integer id) {
        notificationRepository.deleteById(id);
    }
}
