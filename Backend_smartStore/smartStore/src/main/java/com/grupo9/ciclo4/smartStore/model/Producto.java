package com.grupo9.ciclo4.smartStore.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "productos")

public class Producto {
	@Id
    private String id;
    
    private int codigoproducto;
    private Number ivacompra;
    private int nitproveedor;
    private String nombreproducto;
    private Number preciocompra;
    private Number precioventa;
    
    
    public Producto() {
        // TODO Auto-generated constructor stub
    }


	public Producto(int codigoproducto, Number ivacompra, int nitproveedor, String nombreproducto,
			Number preciocompra, Number precioventa) {
		super();
		this.codigoproducto = codigoproducto;
		this.ivacompra = ivacompra;
		this.nitproveedor = nitproveedor;
		this.nombreproducto = nombreproducto;
		this.preciocompra = preciocompra;
		this.precioventa = precioventa;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public int getCodigoproducto() {
		return codigoproducto;
	}


	public void setCodigoproducto(int codigoproducto) {
		this.codigoproducto = codigoproducto;
	}


	public Number getIvacompra() {
		return ivacompra;
	}


	public void setIvacompra(Number ivacompra) {
		this.ivacompra = ivacompra;
	}


	public int getNitproveedor() {
		return nitproveedor;
	}


	public void setNitproveedor(int nitproveedor) {
		this.nitproveedor = nitproveedor;
	}


	public String getNombreproducto() {
		return nombreproducto;
	}


	public void setNombreproducto(String nombreproducto) {
		this.nombreproducto = nombreproducto;
	}


	public Number getPreciocompra() {
		return preciocompra;
	}


	public void setPreciocompra(Number preciocompra) {
		this.preciocompra = preciocompra;
	}


	public Number getPrecioventa() {
		return precioventa;
	}


	public void setPrecioventa(Number precioventa) {
		this.precioventa = precioventa;
	}
	
}
