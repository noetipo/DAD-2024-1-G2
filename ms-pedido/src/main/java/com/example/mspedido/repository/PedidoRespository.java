package com.example.mspedido.repository;

import com.example.mspedido.entity.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRespository extends JpaRepository<Pedido, Integer> {
}
