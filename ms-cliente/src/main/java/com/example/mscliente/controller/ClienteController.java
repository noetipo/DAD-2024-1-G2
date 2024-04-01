package com.example.mscliente.controller;

import com.example.mscliente.entity.Cliente;
import com.example.mscliente.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cliente")
public class ClienteController {
    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<Cliente>> listar() {
        return ResponseEntity.ok(clienteService.listar());
    }

    @PostMapping
    public ResponseEntity<Cliente> guardar(@RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.guardar(cliente));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarPOrId(@PathVariable(required = true) Integer id) {
        return ResponseEntity.ok(clienteService.buscarPorId(id).get());
    }

    @PutMapping
    public ResponseEntity<Cliente> actualizar(@RequestBody Cliente cliente) {
        return ResponseEntity.ok(clienteService.actualizar(cliente));

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<List<Cliente>> eliminar(@PathVariable(required = true) Integer id) {
        clienteService.eliminar(id);
        return ResponseEntity.ok(clienteService.listar());
    }
}
