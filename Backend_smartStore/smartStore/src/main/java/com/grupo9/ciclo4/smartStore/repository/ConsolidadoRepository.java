package com.grupo9.ciclo4.smartStore.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.grupo9.ciclo4.smartStore.model.Consolidado;

public interface ConsolidadoRepository  extends MongoRepository<Consolidado, String>{
	
	List<Consolidado> findByCiudad(String ciudad);
}
