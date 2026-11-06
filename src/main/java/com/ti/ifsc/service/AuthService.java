package com.ti.ifsc.service;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ti.ifsc.dto.CadastroRequest;
import com.ti.ifsc.dto.LoginRequest;
import com.ti.ifsc.dto.LoginResponse;
import com.ti.ifsc.dto.RecuperarSenhaRequest;
import com.ti.ifsc.exception.ApiException;
import com.ti.ifsc.model.Usuario;
import com.ti.ifsc.repository.UsuarioRepository;

@Service
public class AuthService {

	private static final Pattern EMAIL = Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");
	private static final Pattern USUARIO = Pattern.compile("^[a-z0-9._-]{3,40}$");
	private static final int SENHA_MIN = 6;
	private static final int SENHA_MAX_BYTES = 72; // limite do BCrypt

	private final UsuarioRepository usuarios;
	private final PasswordEncoder encoder = new BCryptPasswordEncoder();

	public AuthService(UsuarioRepository usuarios) {
		this.usuarios = usuarios;
	}

	@Transactional
	public void cadastrar(CadastroRequest req) {
		if (req == null || vazio(req.nome()) || vazio(req.email()) || vazio(req.usuario())
				|| vazio(req.senha()) || vazio(req.confirmarSenha())) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Preencha todos os campos!");
		}

		String nome = req.nome().trim();
		String email = req.email().trim().toLowerCase(Locale.ROOT);
		String usuario = req.usuario().trim().toLowerCase(Locale.ROOT);
		String senha = req.senha();

		if (nome.length() > 120) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Nome muito longo!");
		}
		if (!EMAIL.matcher(email).matches() || email.length() > 160) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "E-mail inválido!");
		}
		if (!USUARIO.matcher(usuario).matches()) {
			throw new ApiException(HttpStatus.BAD_REQUEST,
					"Usuário deve ter de 3 a 40 caracteres: letras, números, ponto, hífen ou sublinhado.");
		}
		if (!senha.equals(req.confirmarSenha())) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "As senhas não coincidem!");
		}
		if (senha.length() < SENHA_MIN) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "A senha deve ter pelo menos 6 caracteres!");
		}
		if (senha.getBytes(StandardCharsets.UTF_8).length > SENHA_MAX_BYTES) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Senha muito longa!");
		}
		if (usuarios.existsByUsuario(usuario)) {
			throw new ApiException(HttpStatus.CONFLICT, "Este usuário já está em uso!");
		}
		if (usuarios.existsByEmail(email)) {
			throw new ApiException(HttpStatus.CONFLICT, "Este e-mail já está cadastrado!");
		}

		usuarios.saveAndFlush(new Usuario(nome, email, usuario, encoder.encode(senha)));
	}

	@Transactional
	public LoginResponse login(LoginRequest req) {
		if (req == null || vazio(req.usuario()) || vazio(req.senha())) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Preencha usuário e senha!");
		}

		// a tela de login aceita "E-mail ou usuário"
		String identificador = req.usuario().trim().toLowerCase(Locale.ROOT);
		Optional<Usuario> encontrado = identificador.contains("@")
				? usuarios.findByEmail(identificador)
				: usuarios.findByUsuario(identificador);

		if (encontrado.isEmpty()
				|| req.senha().getBytes(StandardCharsets.UTF_8).length > SENHA_MAX_BYTES
				|| !encoder.matches(req.senha(), encontrado.get().getSenhaHash())) {
			throw new ApiException(HttpStatus.UNAUTHORIZED, "Usuário ou senha incorretos!");
		}

		Usuario u = encontrado.get();
		String token = UUID.randomUUID().toString();
		u.setToken(token);
		usuarios.save(u);

		return new LoginResponse("Login realizado com sucesso!", token);
	}

	/** Só valida a entrada: ainda não há envio de e-mail/SMS. */
	public void recuperarSenha(RecuperarSenhaRequest req) {
		if (req == null || vazio(req.contato())) {
			throw new ApiException(HttpStatus.BAD_REQUEST, "Informe seu e-mail ou telefone!");
		}
	}

	private static boolean vazio(String s) {
		return s == null || s.isBlank();
	}
}
