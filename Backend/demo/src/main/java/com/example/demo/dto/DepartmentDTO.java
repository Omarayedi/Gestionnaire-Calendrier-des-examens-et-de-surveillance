package com.example.demo.dto;

public class DepartmentDTO {
    private Integer departmentId;
    private String name;

    public DepartmentDTO(Integer departmentId, String name) {
        this.departmentId = departmentId;
        this.name = name;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public String getName() {
        return name;
    }
}
