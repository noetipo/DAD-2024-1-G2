package com.example.mspedido.feign;

import com.example.mspedido.dto.ProductoDto;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "ms-catalogo-service",path = "/producto")
public interface CatalogoFeign {
    @GetMapping("/{id}")
    @CircuitBreaker(name = "productoListarPorIdCB", fallbackMethod = "fallbackProducto")
    public ResponseEntity<ProductoDto> productoBuscarPorId(@PathVariable(required = true) Integer id);
    default ResponseEntity<ProductoDto> fallbackProducto(Integer id, Exception e) {
        ProductoDto productoDto = new ProductoDto();
        productoDto.setId(9000000);
        return ResponseEntity.ok(productoDto);
    }
}
