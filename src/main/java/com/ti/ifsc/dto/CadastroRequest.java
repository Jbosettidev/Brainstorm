package com.ti.ifsc.dto;

public record CadastroRequest(String nome, String email, String usuario, String senha, String confirmarSenha) {
}
