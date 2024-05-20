package com.example.objetos.controller.model;

public class Alumno extends Persona{

    private  String carrera;
    private String codigoUniversitario;

    public String getCarrera() {
        return carrera;
    }

    public void setCarrera(String carrera) {
        this.carrera = carrera;
    }

    public String getCodigoUniversitario() {
        return codigoUniversitario;
    }

    public void setCodigoUniversitario(String codigoUniversitario) {
        this.codigoUniversitario = codigoUniversitario;
    }

    public Alumno(String dni, String nombres, String carrera, String codigoUniversitario) {
        super(dni, nombres);
        this.carrera = carrera;
        this.codigoUniversitario = codigoUniversitario;
    }

    public Alumno(String carrera, String codigoUniversitario) {
        this.carrera = carrera;
        this.codigoUniversitario = codigoUniversitario;
    }
    public Alumno(){

    }

    @Override
    public String toString() {
        return "Alumno{" +
                "carrera='" + carrera + '\'' +
                ", codigoUniversitario='" + codigoUniversitario + '\'' +
                ", dni='" + dni + '\'' +
                ", nombres='" + nombres + '\'' +
                '}';
    }
}
