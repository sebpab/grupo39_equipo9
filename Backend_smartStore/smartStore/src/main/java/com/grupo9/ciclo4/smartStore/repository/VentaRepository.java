package com.grupo9.ciclo4.smartStore.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.grupo9.ciclo4.smartStore.model.Venta;


public interface VentaRepository extends MongoRepository<Venta, String> {
	
	//List<Venta> findByCodigoVenta(Long codigoventa);

}
