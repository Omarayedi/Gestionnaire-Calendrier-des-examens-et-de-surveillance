package com.example.demo.repository;

import com.example.demo.entity.Notification;
import com.example.demo.entity.NotificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByUserId(Integer userId);
    List<Notification> findByStatus(NotificationStatus status);
}
