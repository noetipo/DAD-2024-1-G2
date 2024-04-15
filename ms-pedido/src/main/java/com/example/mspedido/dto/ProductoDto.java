package com.example.mspedido.dto;

import lombok.Data;

@Data
public class ProductoDto {
    private Integer id;
    private String nombre;
    private CategoriaDto categoria;
}
