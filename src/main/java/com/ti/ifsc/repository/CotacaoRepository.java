package com.ti.ifsc.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ti.ifsc.model.Cotacao;

public interface CotacaoRepository extends JpaRepository<Cotacao, Long> {

	List<Cotacao> findAllByOrderByCulturaAsc();

	Optional<Cotacao> findByCultura(String cultura);
}
