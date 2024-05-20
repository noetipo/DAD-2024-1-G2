package com.example.objetos.controller;

import com.example.objetos.controller.model.Persona;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/persona")
public class personaController {

    @GetMapping()
    public String saludo() {
        return "hola";
    }

    @GetMapping("persona")
    public Persona listar() {

        Persona persona = new Persona();
        persona.setDni("545646");
        persona.setNombres("noe tipo");
        return persona;
    }

    @GetMapping("listar")
    public List<Persona> personas() {
        List<Persona> personas = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            Persona persona = new Persona();
            persona.setNombres("Persona " + i);
            persona.setDni("0000" + i);
            personas.add(persona);
        }
        return personas;
    }
}
