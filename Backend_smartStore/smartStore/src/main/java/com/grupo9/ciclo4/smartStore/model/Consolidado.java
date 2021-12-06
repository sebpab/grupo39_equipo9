package com.grupo9.ciclo4.smartStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "consolidado")
public class Consolidado {
	
	@Id
	private String codigociudad;
	private String ciudad;
	private Long totalventas;
	
	public Consolidado() {

	}

	public Consolidado(String codigociudad,String ciudad, Long totalventas) {
		super();
		this.codigociudad = codigociudad;
		this.ciudad = ciudad;
		this.totalventas = totalventas;
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

	public Long getTotalventas() {
		return totalventas;
	}

	public void setTotalventas(Long totalventas) {
		this.totalventas = totalventas;
	}
	
	
}
