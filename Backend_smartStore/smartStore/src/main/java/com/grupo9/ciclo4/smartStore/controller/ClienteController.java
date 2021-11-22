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

import com.grupo9.ciclo4.smartStore.model.Cliente;

import com.grupo9.ciclo4.smartStore.repository.ClienteRepository;



@CrossOrigin(origins = "*") // determina quien puede consumir la API *=todos
//@CrossOrigin(origins = "http://localhost:8081") //
@RestController
@RequestMapping("/api")
public class ClienteController {
	
	@Autowired
	ClienteRepository clienteRepository;
	
	
	@GetMapping("/clientes")
	public ResponseEntity<List<Cliente>> getAllClientes() {
		try {
			List<Cliente> clientes = new ArrayList<Cliente>();

			clienteRepository.findAll().forEach(clientes::add);
			
			if (clientes.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(clientes, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
	
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<Cliente> getclienteById(@PathVariable("id") String cedula){
		Optional<Cliente> clienteData = clienteRepository.findById(cedula);
		
		if(clienteData.isPresent()) {
			return new ResponseEntity<>(clienteData.get(), HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
	}
	
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<HttpStatus> deleteClientes(@PathVariable("id") String cedula){
		
		try {
		
			clienteRepository.deleteById(cedula);
		
			return new ResponseEntity<>(HttpStatus.OK);
			
		}catch(Exception e) {
			
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@PostMapping("/clientes")
	public ResponseEntity<Cliente> createCliente(@RequestBody Cliente client){
		try {
			
			
			Cliente _cliente = clienteRepository.save(new Cliente(client.getCedula(), client.getNombrecompleto(), 
					client.getDireccion(), client.getTelefono(), client.getCorreo()));
					
			return new ResponseEntity<>(_cliente, HttpStatus.CREATED);
			
		}catch(Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR); 
			
		}
	}
	
	
	@PutMapping("/clientes/{id}")
	public ResponseEntity<Cliente> updateCliente(@PathVariable("id") String cedula, @RequestBody Cliente client){
		
		Optional<Cliente>clienteData = clienteRepository.findById(cedula);
		
		if(clienteData.isPresent()) {
			Cliente _cliente = clienteData.get();
			
			_cliente.setDireccion(client.getDireccion());
			_cliente.setTelefono(client.getTelefono());
			_cliente.setCorreo(client.getCorreo());
			
			return new ResponseEntity<>(HttpStatus.OK);
			
		}
		
		else {
			
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	
	
	
	
	@DeleteMapping("/clientes")
	public ResponseEntity<HttpStatus> deleteAllClientes(){
		
		try {
		
			clienteRepository.deleteAll();
		
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
