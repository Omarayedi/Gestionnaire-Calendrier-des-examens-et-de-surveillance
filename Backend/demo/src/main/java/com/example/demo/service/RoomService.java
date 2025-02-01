package com.example.demo.service;

import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;

    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }
}

