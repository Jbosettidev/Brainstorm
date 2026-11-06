package com.ti.ifsc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ti.ifsc.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

	Optional<Usuario> findByUsuario(String usuario);

	Optional<Usuario> findByEmail(String email);

	Optional<Usuario> findByToken(String token);

	boolean existsByUsuario(String usuario);

	boolean existsByEmail(String email);
}
