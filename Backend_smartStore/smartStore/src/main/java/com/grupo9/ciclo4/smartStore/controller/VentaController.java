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

import com.grupo9.ciclo4.smartStore.model.Venta;

import com.grupo9.ciclo4.smartStore.repository.VentaRepository;



@CrossOrigin(origins = "*") // determina quien puede consumir la API *=todos
//@CrossOrigin(origins = "http://localhost:8081") //
@RestController
@RequestMapping("/api")
public class VentaController {
	
	@Autowired
	VentaRepository ventaRepository;
	
	
	@GetMapping("/ventas")
	public ResponseEntity<List<Venta>> getAllVentas() {
		try {
			List<Venta> ventas = new ArrayList<Venta>();

			ventaRepository.findAll().forEach(ventas::add);
			
			if (ventas.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(ventas, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@GetMapping("/ventas/{id}")
	public ResponseEntity<Venta> getventaById(@PathVariable("id") String codigoventa){
		Optional<Venta> ventaData = ventaRepository.findById(codigoventa);
		
		if(ventaData.isPresent()) {
			return new ResponseEntity<>(ventaData.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/ventas/{id}")
	public ResponseEntity<HttpStatus> deleteVenta(@PathVariable("id") String codigoventa){
		
		try {
		
			ventaRepository.deleteById(codigoventa);
		
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception e) {
			
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/ventas")
	public ResponseEntity<Venta> createVenta(@RequestBody Venta venta){
		try {
			
			
			Venta _venta = ventaRepository.save(new Venta(venta.getCedulacliente(), venta.getCodigoventa(), 
					venta.getDetalleventa(), venta.getIvaventa(), venta.getTotalventa(), venta.getValorventa()));
					
			return new ResponseEntity<>(_venta, HttpStatus.CREATED);
			
		}catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
			
		}
	}
	
	
	@PutMapping("/ventas/{id}")
	public ResponseEntity<Venta> updateVenta(@PathVariable("id") String codigoventa, @RequestBody Venta venta){
		
		Optional<Venta>ventaData = ventaRepository.findById(codigoventa);
		
		if(ventaData.isPresent()) {
			Venta _venta = ventaData.get();
			
			_venta.setCedulacliente(venta.getCedulacliente());
			_venta.setDetalleventa(venta.getDetalleventa());
			_venta.setIvaventa(venta.getIvaventa());
			_venta.setTotalventa(venta.getTotalventa());
			_venta.setValorventa(venta.getValorventa())	;
			return new ResponseEntity<>(ventaRepository.save(_venta), HttpStatus.OK);
			
		}
		
		else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	
	
	
	@DeleteMapping("/ventas")
	public ResponseEntity<HttpStatus> deleteAllVenta(){
		
		try {
		
			ventaRepository.deleteAll();
		
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception e) {
			
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
					
		
	}
	
	
	/*
	@GetMapping("/clientes/{nombre}")
	public ResponseEntity<List<Cliente>> findByNombrecompleto(@PathVariable("nombre") String nombre){

		
		
		List<Cliente> clientes = clienteRepository.findByNombrecompleto(nombre);
		
		try {
		
			
		if(clientes.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
		
		}catch(Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
	}
*/		
		
	

}