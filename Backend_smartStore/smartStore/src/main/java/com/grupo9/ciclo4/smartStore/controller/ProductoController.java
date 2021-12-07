package com.grupo9.ciclo4.smartStore.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.grupo9.ciclo4.smartStore.model.Producto;
import com.grupo9.ciclo4.smartStore.repository.ProductoRepository;

@CrossOrigin(origins = "*") // determina quien puede consumir la API *=todos
//@CrossOrigin(origins = "http://localhost:8081") //
@RestController
@RequestMapping("/api")

public class ProductoController {
	@Autowired
	ProductoRepository productoRepository;
	@GetMapping("/productos")
    public ResponseEntity<List<Producto>> getAllProductos(@RequestParam(required = false) Integer codigoproducto) {
        try {
            List<Producto> productos = new ArrayList<Producto>();
            if (codigoproducto == null) {
            	productoRepository.findAll().forEach(productos::add);
            } else {
            	productoRepository.findByCodigoproducto(codigoproducto).forEach(productos::add);
            }
            if (productos.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(productos, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
	@GetMapping("/productos/id/{id}")
	public ResponseEntity<Producto> getproductoById(@PathVariable("id") String id){
		Optional<Producto> productoData = productoRepository.findById(id);
		
		if(productoData.isPresent()) {
			return new ResponseEntity<>(productoData.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PostMapping("/productos")
	public ResponseEntity<Producto> createProducto(@RequestBody Producto product){
		try {
			
			Producto _producto = productoRepository.save(new Producto(product.getCodigoproducto(), 
					product.getIvacompra(), product.getNitproveedor(), product.getNombreproducto(), 
					product.getPreciocompra(), product.getPrecioventa()));
			
			return new ResponseEntity<>(_producto, HttpStatus.CREATED);
			
		}catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
			
		}
	}

	@PutMapping("/productos/{id}")
	public ResponseEntity<Producto> updateProducto(@PathVariable("id") String id, @RequestBody Producto product){
		
		Optional<Producto>productoData = productoRepository.findById(id);
		
		if(productoData.isPresent()) {
			Producto _producto = productoData.get();
			_producto.setCodigoproducto(product.getCodigoproducto());
			_producto.setIvacompra(product.getIvacompra());
			_producto.setNitproveedor(product.getNitproveedor());
			_producto.setNombreproducto(product.getNombreproducto());
			_producto.setPreciocompra(product.getPreciocompra());
			_producto.setPrecioventa(product.getPrecioventa());
			
			return new ResponseEntity<>(HttpStatus.OK);
		}
		
		else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/productos/{id}")
	public ResponseEntity<HttpStatus> deleteProductos(@PathVariable("id") String id){
		
		try {
			productoRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@DeleteMapping("/productos")
	public ResponseEntity<HttpStatus> deleteAllProductos(){
		
		try {
		
			productoRepository.deleteAll();
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("/productos/codigo/{codigoproducto}")
	public ResponseEntity<List<Producto>> findByCodigoproducto(@PathVariable("codigoproducto") int codigoproducto){

		List<Producto> productos = productoRepository.findByCodigoproducto(codigoproducto);
		
		try {
		if(productos.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(productos,HttpStatus.OK);
		
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}