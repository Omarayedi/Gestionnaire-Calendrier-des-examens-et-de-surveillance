package com.example.demo.service;

import com.example.demo.entity.ScheduleLog;
import com.example.demo.repository.ScheduleLogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleLogService {

    private final ScheduleLogRepository scheduleLogRepository;

    public ScheduleLogService(ScheduleLogRepository scheduleLogRepository) {
        this.scheduleLogRepository = scheduleLogRepository;
    }

    public List<ScheduleLog> getAllScheduleLogs() {
        return scheduleLogRepository.findAll();
    }

    public ScheduleLog createScheduleLog(ScheduleLog scheduleLog) {
        return scheduleLogRepository.save(scheduleLog);
    }
}

