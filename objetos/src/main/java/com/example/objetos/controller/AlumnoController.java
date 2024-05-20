package com.example.objetos.controller;

import com.example.objetos.controller.model.Alumno;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alumno")
public class AlumnoController {

    @RequestMapping()
    public Alumno objetoAlumno() {
        Alumno alumno = new Alumno();
        alumno.setNombres("noe");
        alumno.setDni("12135");
        alumno.setCarrera("sistemas");
        alumno.setCodigoUniversitario("8555422");

        return alumno;
    }
}
