package com.grupo9.ciclo4.smartStore.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.grupo9.ciclo4.smartStore.model.Cliente;


public interface ClienteRepository extends MongoRepository<Cliente, String> {
	

	
	//List<Cliente> findByNombrecompleto(String nombrecompleto);

}
