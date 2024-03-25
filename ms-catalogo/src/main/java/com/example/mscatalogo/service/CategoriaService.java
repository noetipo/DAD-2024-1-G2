package com.example.mscatalogo.service;

import com.example.mscatalogo.entity.Categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {

    public List<Categoria> listar();

    public Categoria guardar(Categoria categoria);

    public Optional<Categoria> buscarPorId(Integer id);

    public Categoria actualizar(Categoria categoria);

    public void eliminar(Integer id);
}
