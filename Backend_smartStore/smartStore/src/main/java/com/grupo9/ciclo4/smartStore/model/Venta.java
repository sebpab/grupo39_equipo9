package com.grupo9.ciclo4.smartStore.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "ventas")
public class Venta {
	@Id
	private String codigoventa;
	private long cedulacliente;
	
	@Indexed(unique=true)
	
	private ArrayList<DetalleVenta> detalleventa;
	private double ivaventa;
	private double totalventa;
	private double valorventa;
	
	public Venta() {
		this.detalleventa= new ArrayList<DetalleVenta>();
	}

	public Venta(long cedulacliente, String codigoventa, ArrayList<DetalleVenta> detalleventa, double ivaventa,
			double totalventa, double valorventa) {
		super();
		this.cedulacliente = cedulacliente;
		this.codigoventa = codigoventa;
		this.detalleventa = detalleventa;
		this.ivaventa = ivaventa;
		this.totalventa = totalventa;
		this.valorventa = valorventa;
	}

	

	public long getCedulacliente() {
		return cedulacliente;
	}

	public void setCedulacliente(long cedulacliente) {
		this.cedulacliente = cedulacliente;
	}

	

	public String getCodigoventa() {
		return codigoventa;
	}

	public void setCodigoventa(String codigoventa) {
		this.codigoventa = codigoventa;
	}

	public ArrayList<DetalleVenta> getDetalleventa() {
		return detalleventa;
	}

	public void setDetalleventa(ArrayList<DetalleVenta> detalleventa) {
		this.detalleventa = detalleventa;
	}

	public double getIvaventa() {
		return ivaventa;
	}

	public void setIvaventa(double ivaventa) {
		this.ivaventa = ivaventa;
	}

	public double getTotalventa() {
		return totalventa;
	}

	public void setTotalventa(double totalventa) {
		this.totalventa = totalventa;
	}

	public double getValorventa() {
		return valorventa;
	}

	public void setValorventa(double valorventa) {
		this.valorventa = valorventa;
	}

}