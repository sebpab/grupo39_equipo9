package com.grupo9.ciclo4.smartStore.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.grupo9.ciclo4.smartStore.model.Producto;

public interface ProductoRepository extends MongoRepository<Producto, String>{


	List<Producto> findByCodigoproducto(int codigoproducto);

	//List<Producto> findByNombreproducto(String Nombreproducto);

}

