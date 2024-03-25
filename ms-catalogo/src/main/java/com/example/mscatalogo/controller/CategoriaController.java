package com.example.mscatalogo.controller;

import com.example.mscatalogo.entity.Categoria;
import com.example.mscatalogo.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listar() {
        return ResponseEntity.ok(categoriaService.listar());
    }

    @PostMapping
    public ResponseEntity<Categoria> guardar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.guardar(categoria));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPOrId(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(categoriaService.buscarPorId(id).get());
    }

    @PutMapping
    public ResponseEntity<Categoria> actualizar(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.actualizar(categoria));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Categoria>>  eliminar(@PathVariable(required = true) Integer id) {
        categoriaService.eliminar(id);
        return ResponseEntity.ok(categoriaService.listar());
    }
}
