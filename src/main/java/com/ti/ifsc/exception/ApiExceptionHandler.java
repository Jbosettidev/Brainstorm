package com.ti.ifsc.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ti.ifsc.dto.MensagemResponse;

/** Todo erro volta como {"mensagem": "..."}, que é o que o frontend lê (dados.mensagem). */
@RestControllerAdvice
public class ApiExceptionHandler {

	@ExceptionHandler(ApiException.class)
	public ResponseEntity<MensagemResponse> handleApi(ApiException e) {
		return ResponseEntity.status(e.getStatus()).body(new MensagemResponse(e.getMessage()));
	}

	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<MensagemResponse> handleCorpoInvalido(HttpMessageNotReadableException e) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MensagemResponse("Requisição inválida!"));
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	public ResponseEntity<MensagemResponse> handleDuplicado(DataIntegrityViolationException e) {
		return ResponseEntity.status(HttpStatus.CONFLICT)
				.body(new MensagemResponse("Usuário ou e-mail já cadastrado!"));
	}
}
