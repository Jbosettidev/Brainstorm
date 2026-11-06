package com.ti.ifsc.dto;

public record LoginResponse(String mensagem, String token, String nome, String email, String usuario) {
}
