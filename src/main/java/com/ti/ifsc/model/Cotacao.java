package com.ti.ifsc.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cotacoes")
public class Cotacao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/** "soja" ou "milho" (minúsculo). */
	@Column(nullable = false, unique = true, length = 20)
	private String cultura;

	@Column(nullable = false, precision = 10, scale = 2)
	private BigDecimal preco;

	/** Variação percentual do dia, ex.: 0.85 ou -0.32. */
	@Column(nullable = false, precision = 6, scale = 2)
	private BigDecimal variacao;

	@Column(nullable = false)
	private LocalDate fechamento;

	@Column(nullable = false, length = 500)
	private String tendencia;

	@Column(nullable = false, length = 500)
	private String impacto;

	protected Cotacao() {
	}

	public Cotacao(String cultura, BigDecimal preco, BigDecimal variacao, LocalDate fechamento,
			String tendencia, String impacto) {
		this.cultura = cultura;
		this.preco = preco;
		this.variacao = variacao;
		this.fechamento = fechamento;
		this.tendencia = tendencia;
		this.impacto = impacto;
	}

	public Long getId() {
		return id;
	}

	public String getCultura() {
		return cultura;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public BigDecimal getVariacao() {
		return variacao;
	}

	public LocalDate getFechamento() {
		return fechamento;
	}

	public String getTendencia() {
		return tendencia;
	}

	public String getImpacto() {
		return impacto;
	}
}
