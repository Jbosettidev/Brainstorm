package com.ti.ifsc.dto;

import java.math.BigDecimal;

import com.ti.ifsc.model.Cotacao;

public record CotacaoResponse(String cultura, BigDecimal preco, BigDecimal variacao, String fechamento,
		String tendencia, String impacto) {

	public static CotacaoResponse from(Cotacao c) {
		return new CotacaoResponse(c.getCultura(), c.getPreco(), c.getVariacao(), c.getFechamento().toString(),
				c.getTendencia(), c.getImpacto());
	}
}
