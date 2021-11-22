package com.grupo9.ciclo4.smartStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "clientes")
public class Cliente {
	
	 @Id 	 
	 private String cedula;	
	 
	 private String nombrecompleto;
	 private String direccion;
	 private String telefono;
	 private String correo;
	 
	
	public Cliente() {
		
	}

	public Cliente(String cedula, String nombre, String direccion, String telefono, String correo) {
		super();
		this.cedula = cedula;
		this.nombrecompleto = nombre;
		this.direccion = direccion;
		this.telefono = telefono;
		this.correo = correo;
	}
	
	
	


	public String getNombrecompleto() {
		return nombrecompleto;
	}

	public void setNombrecompleto(String nombrecompleto) {
		this.nombrecompleto = nombrecompleto;
	}

	public String getCedula() {
		return cedula;
	}

	public void setCedula(String cedula) {
		this.cedula = cedula;
	}


	public String getDireccion() {
		return direccion;
	}

	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getCorreo() {
		return correo;
	}

	public void setCorreo(String correo) {
		this.correo = correo;
	}
	
	
	 

}
