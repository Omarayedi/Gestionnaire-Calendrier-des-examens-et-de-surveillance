package com.example.demo.service;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import com.example.demo.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    public Optional<Notification> getNotificationById(Integer id) {
        return notificationRepository.findById(id);
    }

    public List<Notification> getNotificationsByUserId(Integer userId) {
        return notificationRepository.findByUserId(userId);
    }

    public List<Notification> getNotificationsByStatus(NotificationStatus status) {
        return notificationRepository.findByStatus(status);
    }

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public Notification updateNotification(Integer id, Notification notificationDetails) {
        return notificationRepository.findById(id).map(notification -> {
            notification.setUserId(notificationDetails.getUserId());
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
