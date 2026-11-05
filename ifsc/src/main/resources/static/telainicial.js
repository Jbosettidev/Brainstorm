let telaAtual = 0;
 
const telas = document.querySelectorAll(".tela");
const bolinhas = document.querySelectorAll(".bolinhas span");
const botaoAvancar = document.getElementById("btnAvancar");
 
const API_URL = "http://localhost:3000/api";
 
function mostrarSecao(idSecao) {
    const secoes = [
        "onboarding",
        "login",
        "cadastro",
        "recuperar"
    ];
 
    secoes.forEach(function(id) {
        document.getElementById(id).hidden = id !== idSecao;
    });
}
 
function proximaTela() {
    telas[telaAtual].classList.remove("ativa");
    bolinhas[telaAtual].classList.remove("ativo");
 
    telaAtual++;
 
    if (telaAtual >= telas.length) {
        mostrarSecao("login");
        return;
    }
 
    telas[telaAtual].classList.add("ativa");
    bolinhas[telaAtual].classList.add("ativo");
 
    if (telaAtual === telas.length - 1) {
        botaoAvancar.textContent = "Começar";
    }
}
 
function mostrarCadastro(event) {
    event.preventDefault();
    mostrarSecao("cadastro");
}
 
function mostrarRecuperar(event) {
    event.preventDefault();
    mostrarSecao("recuperar");
}
 
function voltarLogin(event) {
    event.preventDefault();
    mostrarSecao("login");
}
 
async function cadastrar() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const usuario = document.getElementById("novoUsuario").value.trim();
    const senha = document.getElementById("novaSenha").value;
    const confirmarSenha = document.getElementById("confirmarSenha").value;
 
    if (
        nome === "" ||
        email === "" ||
        usuario === "" ||
        senha === "" ||
        confirmarSenha === ""
    ) {
        mostrarToast("Preencha todos os campos!", "erro");
        return;
    }
 
    if (senha !== confirmarSenha) {
        mostrarToast("As senhas não coincidem!", "erro");
        return;
    }
 
    try {
        const resposta = await fetch(`${API_URL}/cadastro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, usuario, senha, confirmarSenha })
        });
 
        const dados = await resposta.json();
 
        if (!resposta.ok) {
            mostrarToast(dados.mensagem || "Erro ao cadastrar!", "erro");
            return;
        }
 
        mostrarToast(dados.mensagem, "sucesso");
 
        setTimeout(function() {
            mostrarSecao("login");
        }, 1200);
    } catch (erro) {
        console.error(erro);
        mostrarToast("Não foi possível conectar ao servidor.", "erro");
    }
}
 
async function entrar() {
    const usuario = document.getElementById("usuario").value.trim();
    const senha = document.getElementById("senha").value;
 
    if (usuario === "" || senha === "") {
        mostrarToast("Preencha usuário e senha!", "erro");
        return;
    }
 
    try {
        const resposta = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario, senha })
        });
 
        const dados = await resposta.json();
 
        if (!resposta.ok) {
            mostrarToast(dados.mensagem || "Usuário ou senha incorretos!", "erro");
            return;
        }
 
        localStorage.setItem("token", dados.token);
 
        mostrarToast(dados.mensagem, "sucesso");
 
        setTimeout(function() {
            window.location.href = "home.html";
        }, 900);
    } catch (erro) {
        console.error(erro);
        mostrarToast("Não foi possível conectar ao servidor.", "erro");
    }
}
 
async function enviarRecuperacao() {
    const contato = document.getElementById("contatoRecuperacao").value.trim();
 
    if (contato === "") {
        mostrarToast("Informe seu e-mail ou telefone!", "erro");
        return;
    }
 
    try {
        const resposta = await fetch(`${API_URL}/recuperar-senha`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contato })
        });
 
        const dados = await resposta.json();
 
        if (!resposta.ok) {
            mostrarToast(dados.mensagem || "Erro ao enviar instruções!", "erro");
            return;
        }
 
        mostrarToast(dados.mensagem, "sucesso");
    } catch (erro) {
        console.error(erro);
        mostrarToast("Não foi possível conectar ao servidor.", "erro");
    }
}
 
function mostrarToast(mensagem, tipo) {
    const toast = document.getElementById("toast");
 
    toast.textContent = mensagem;
    toast.className = "toast show " + tipo;
 
    setTimeout(function() {
        toast.className = "toast";
    }, 3000);
}