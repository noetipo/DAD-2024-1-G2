package com.example.mspedido.service.impl;

import com.example.mspedido.entity.Pedido;
import com.example.mspedido.repository.PedidoRespository;
import com.example.mspedido.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PedidoServiceImpl implements PedidoService {
    @Autowired
    PedidoRespository pedidoRespository;

    @Override
    public List<Pedido> listar() {
        return pedidoRespository.findAll();
    }

    @Override
    public Pedido guardar(Pedido pedido) {
        return pedidoRespository.save(pedido);
    }

    @Override
    public Optional<Pedido> buscarPorId(Integer id) {
        return pedidoRespository.findById(id);
    }

    @Override
    public Pedido actualizar(Pedido pedido) {
        return pedidoRespository.save(pedido);
    }

    @Override
    public void eliminar(Integer id) {
        pedidoRespository.deleteById(id);

    }
}
