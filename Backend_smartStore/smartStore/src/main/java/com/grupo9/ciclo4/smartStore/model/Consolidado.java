package com.grupo9.ciclo4.smartStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "consolidado")
public class Consolidado {
	
	@Id
	private String codigoventa;
	private String ciudad;
	private String codigociudad;
	
	public Consolidado() {

	}

	public Consolidado(String codigociudad,String ciudad, String codigoventa) {
		super();
		this.codigoventa = codigoventa;
		this.codigociudad = codigociudad;
		this.ciudad = ciudad;
	}



	public String getCodigociudad() {
		return codigociudad;
	}

	public void setCodigociudad(String codigociudad) {
		this.codigociudad = codigociudad;
	}

	public String getCiudad() {
		return ciudad;
	}

	public void setCiudad(String ciudad) {
		this.ciudad = ciudad;
	}

	public String getCodigoventa() {
		return codigoventa;
	}

	public void setCodigoventa(String codigoventa) {
		this.codigoventa = codigoventa;
	}

	
	
	
}
