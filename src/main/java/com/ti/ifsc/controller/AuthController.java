package com.ti.ifsc.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ti.ifsc.dto.CadastroRequest;
import com.ti.ifsc.dto.LoginRequest;
import com.ti.ifsc.dto.LoginResponse;
import com.ti.ifsc.dto.MensagemResponse;
import com.ti.ifsc.dto.RecuperarSenhaRequest;
import com.ti.ifsc.service.AuthService;

@RestController
@RequestMapping("/api")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	@PostMapping("/cadastro")
	public ResponseEntity<MensagemResponse> cadastrar(@RequestBody CadastroRequest req) {
		authService.cadastrar(req);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new MensagemResponse("Cadastro realizado com sucesso!"));
	}

	@PostMapping("/login")
	public LoginResponse login(@RequestBody LoginRequest req) {
		return authService.login(req);
	}

	@PostMapping("/recuperar-senha")
	public MensagemResponse recuperarSenha(@RequestBody RecuperarSenhaRequest req) {
		authService.recuperarSenha(req);
		return new MensagemResponse("Se o contato estiver cadastrado, você receberá as instruções de recuperação.");
	}
}
