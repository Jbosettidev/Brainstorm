const CHAVE_PERFIL = "brainstormPerfil";

const inputFoto = document.getElementById("inputFoto");

let fotoSelecionada = "";

function obterPerfilSalvo() {
    const dados = localStorage.getItem(CHAVE_PERFIL);

    if (!dados) {
        return {};
    }

    try {
        return JSON.parse(dados);
    } catch (erro) {
        return {};
    }
}

function salvarPerfil(dadosNovos) {
    const perfilAtual = obterPerfilSalvo();

    const perfilAtualizado = {
        ...perfilAtual,
        ...dadosNovos,
        foto: fotoSelecionada || perfilAtual.foto || ""
    };

    localStorage.setItem(
        CHAVE_PERFIL,
        JSON.stringify(perfilAtualizado)
    );

    mostrarMensagem("Alterações salvas com sucesso!");
}

function abrirTela(tipo) {
    document
        .querySelectorAll(".tela-perfil")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    if (tipo === "pessoais") {
        document
            .getElementById("telaPessoais")
            .classList.add("ativa");
    }

    if (tipo === "contato") {
        document
            .getElementById("telaContato")
            .classList.add("ativa");
    }

    if (tipo === "seguranca") {
        document
            .getElementById("telaSeguranca")
            .classList.add("ativa");
    }
}

function voltarMenu() {
    document
        .querySelectorAll(".tela-perfil")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    document
        .getElementById("menuPerfil")
        .classList.add("ativa");
}

function abrirSeletorFoto() {
    inputFoto.click();
}

inputFoto.addEventListener("change", function(evento) {
    const arquivo = evento.target.files[0];

    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        mostrarMensagem("Escolha um arquivo de imagem.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(eventoLeitura) {
        fotoSelecionada = eventoLeitura.target.result;

        atualizarFotos(fotoSelecionada);

        salvarPerfil({
            foto: fotoSelecionada
        });
    };

    leitor.readAsDataURL(arquivo);
});

function atualizarFotos(foto) {
    const imagens = [
        document.getElementById("fotoMenu"),
        document.getElementById("fotoPessoais")
    ];

    const icones = [
        document.getElementById("iconeMenu"),
        document.getElementById("iconePessoais")
    ];

    imagens.forEach(function(imagem) {
        if (foto) {
            imagem.src = foto;
            imagem.style.display = "block";
        } else {
            imagem.style.display = "none";
        }
    });

    icones.forEach(function(icone) {
        icone.style.display = foto ? "none" : "block";
    });
}

function salvarInformacoesPessoais(evento) {
    evento.preventDefault();

    const nome =
        document.getElementById("nomeCompleto").value.trim();

    const dataNascimento =
        document.getElementById("dataNascimento").value;

    const genero =
        document.getElementById("genero").value;

    if (nome === "") {
        mostrarMensagem("Digite seu nome completo.");
        return;
    }

    salvarPerfil({
        nome: nome,
        dataNascimento: dataNascimento,
        genero: genero
    });
}

function salvarContato(evento) {
    evento.preventDefault();

    const email =
        document.getElementById("emailPerfil").value.trim();

    const telefone =
        document.getElementById("telefonePerfil").value.trim();

    if (email === "" && telefone === "") {
        mostrarMensagem(
            "Preencha o e-mail ou o telefone."
        );

        return;
    }

    salvarPerfil({
        email: email,
        telefone: telefone
    });
}

function alterarSenha(evento) {
    evento.preventDefault();

    const identificacao =
        document
            .getElementById("identificacaoSenha")
            .value
            .trim();

    const novaSenha =
        document.getElementById("novaSenhaPerfil").value;

    if (identificacao === "" || novaSenha === "") {
        mostrarMensagem("Preencha todos os campos.");
        return;
    }

    localStorage.setItem("senha", novaSenha);

    mostrarMensagem("Senha alterada com sucesso!");

    document.getElementById("identificacaoSenha").value = "";
    document.getElementById("novaSenhaPerfil").value = "";
}

function excluirConta(evento) {
    evento.preventDefault();

    const identificacao =
        document
            .getElementById("identificacaoExcluir")
            .value
            .trim();

    const senha =
        document.getElementById("senhaExcluir").value;

    if (identificacao === "" || senha === "") {
        mostrarMensagem("Preencha todos os campos.");
        return;
    }

    const confirmar = confirm(
        "Tem certeza que deseja excluir sua conta? Essa ação removerá os dados salvos neste navegador."
    );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem(CHAVE_PERFIL);
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
    localStorage.removeItem("brainstormPublicacoes");

    alert("Conta excluída.");

    window.location.href = "telainicial.html";
}

function carregarDados() {
    const perfil = obterPerfilSalvo();

    fotoSelecionada = perfil.foto || "";

    atualizarFotos(fotoSelecionada);

    document.getElementById("nomeCompleto").value =
        perfil.nome || "";

    document.getElementById("dataNascimento").value =
        perfil.dataNascimento || "";

    document.getElementById("genero").value =
        perfil.genero || "";

    document.getElementById("emailPerfil").value =
        perfil.email || "";

    document.getElementById("telefonePerfil").value =
        perfil.telefone || "";
}

function mostrarMensagem(texto) {
    const mensagem =
        document.getElementById("mensagemPerfil");

    mensagem.textContent = texto;
    mensagem.classList.add("mostrar");

    setTimeout(function() {
        mensagem.classList.remove("mostrar");
    }, 2500);
}

carregarDados();