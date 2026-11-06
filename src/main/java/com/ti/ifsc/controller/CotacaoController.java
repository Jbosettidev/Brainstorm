package com.ti.ifsc.controller;

import java.util.List;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ti.ifsc.dto.CotacaoResponse;
import com.ti.ifsc.exception.ApiException;
import com.ti.ifsc.repository.CotacaoRepository;

@RestController
@RequestMapping("/api/cotacoes")
public class CotacaoController {

	private final CotacaoRepository cotacoes;

	public CotacaoController(CotacaoRepository cotacoes) {
		this.cotacoes = cotacoes;
	}

	@GetMapping
	public List<CotacaoResponse> listar() {
		return cotacoes.findAllByOrderByCulturaAsc().stream().map(CotacaoResponse::from).toList();
	}

	@GetMapping("/{cultura}")
	public CotacaoResponse buscar(@PathVariable String cultura) {
		return cotacoes.findByCultura(cultura.toLowerCase(Locale.ROOT))
				.map(CotacaoResponse::from)
				.orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Cotação não encontrada!"));
	}
}
