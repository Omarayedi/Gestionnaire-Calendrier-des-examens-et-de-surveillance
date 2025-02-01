package com.example.demo.controller;

import com.example.demo.entity.ScheduleLog;
import com.example.demo.service.ScheduleLogService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schedule-logs")
public class ScheduleLogController {

    private final ScheduleLogService scheduleLogService;

    public ScheduleLogController(ScheduleLogService scheduleLogService) {
        this.scheduleLogService = scheduleLogService;
    }

    @GetMapping
    public List<ScheduleLog> getAllScheduleLogs() {
        return scheduleLogService.getAllScheduleLogs();
    }

    @PostMapping
    public ScheduleLog createScheduleLog(@RequestBody ScheduleLog scheduleLog) {
        return scheduleLogService.createScheduleLog(scheduleLog);
    }
}
