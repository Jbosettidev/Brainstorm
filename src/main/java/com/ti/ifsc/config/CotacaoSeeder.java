package com.ti.ifsc.config;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.ti.ifsc.model.Cotacao;
import com.ti.ifsc.repository.CotacaoRepository;

/**
 * Popula a tabela de cotações com DADOS DE DEMONSTRAÇÃO na primeira execução,
 * para a tela da Bolsa de Chicago ter o que mostrar. Não são preços reais.
 */
@Component
public class CotacaoSeeder implements CommandLineRunner {

	private final CotacaoRepository cotacoes;

	public CotacaoSeeder(CotacaoRepository cotacoes) {
		this.cotacoes = cotacoes;
	}

	@Override
	public void run(String... args) {
		if (cotacoes.count() > 0) {
			return;
		}

		LocalDate hoje = LocalDate.now();

		cotacoes.saveAll(List.of(
				new Cotacao("soja", new BigDecimal("128.40"), new BigDecimal("0.85"), hoje,
						"Dados de demonstração: soja em leve alta e milho em leve queda.",
						"Dados de demonstração: nenhuma fonte de cotações real foi integrada ainda."),
				new Cotacao("milho", new BigDecimal("61.75"), new BigDecimal("-0.32"), hoje,
						"Dados de demonstração: soja em leve alta e milho em leve queda.",
						"Dados de demonstração: nenhuma fonte de cotações real foi integrada ainda.")));
	}
}
