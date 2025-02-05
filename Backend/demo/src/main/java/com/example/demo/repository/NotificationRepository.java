package com.example.demo.repository;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import com.example.demo.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUser(User user);
    List<Notification> findByStatus(NotificationStatus status);
}
