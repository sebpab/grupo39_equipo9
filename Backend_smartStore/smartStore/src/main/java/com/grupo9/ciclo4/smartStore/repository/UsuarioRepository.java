package com.grupo9.ciclo4.smartStore.repository;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.grupo9.ciclo4.smartStore.model.Usuario;

public interface UsuarioRepository extends MongoRepository<Usuario, String>{


	List<Usuario> findByUsername(String username);

	//List<Usuario> findByNombre_completo(String Nombre_completo);
}
