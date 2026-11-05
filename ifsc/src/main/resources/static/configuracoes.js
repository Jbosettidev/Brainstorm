const CHAVE_PERFIL = "brainstormPerfil";
const CHAVE_CONFIGURACOES = "brainstormConfiguracoes";

let fotoSelecionada = "";

function abrirTela(nome) {
    document
        .querySelectorAll(".tela")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    if (nome === "perfil") {
        document.getElementById("telaPerfil")
            .classList.add("ativa");
    }

    if (nome === "senha") {
        document.getElementById("telaSenha")
            .classList.add("ativa");
    }

    if (nome === "privacidade") {
        document.getElementById("telaPrivacidade")
            .classList.add("ativa");
    }
}

function voltarPrincipal() {
    document
        .querySelectorAll(".tela")
        .forEach(function(tela) {
            tela.classList.remove("ativa");
        });

    document.getElementById("telaPrincipal")
        .classList.add("ativa");
}

function obterPerfil() {
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

function obterConfiguracoes() {
    const dados =
        localStorage.getItem(CHAVE_CONFIGURACOES);

    if (!dados) {
        return {};
    }

    try {
        return JSON.parse(dados);
    } catch (erro) {
        return {};
    }
}

function salvarConfiguracoes() {
    const configuracoes = {
        notificacoes:
            document.getElementById("notificacoes").checked,

        modoEscuro:
            document.getElementById("modoEscuro").checked,

        autenticacao:
            document.getElementById("autenticacao").checked
    };

    localStorage.setItem(
        CHAVE_CONFIGURACOES,
        JSON.stringify(configuracoes)
    );

    aplicarModoEscuro(configuracoes.modoEscuro);
}

function aplicarModoEscuro(ativado) {
    document.body.classList.toggle(
        "modo-escuro",
        ativado
    );
}

document
    .getElementById("notificacoes")
    .addEventListener("change", salvarConfiguracoes);

document
    .getElementById("modoEscuro")
    .addEventListener("change", salvarConfiguracoes);

document
    .getElementById("autenticacao")
    .addEventListener("change", salvarConfiguracoes);

function carregarConfiguracoes() {
    const configuracoes = obterConfiguracoes();

    document.getElementById("notificacoes").checked =
        configuracoes.notificacoes !== false;

    document.getElementById("modoEscuro").checked =
        configuracoes.modoEscuro || false;

    document.getElementById("autenticacao").checked =
        configuracoes.autenticacao || false;

    aplicarModoEscuro(
        document.getElementById("modoEscuro").checked
    );
}

function abrirSeletorFoto() {
    document.getElementById("inputFoto").click();
}

document
    .getElementById("inputFoto")
    .addEventListener("change", function(evento) {
        const arquivo = evento.target.files[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            mostrarMensagem(
                "Escolha um arquivo de imagem."
            );

            return;
        }

        const leitor = new FileReader();

        leitor.onload = function(eventoLeitura) {
            fotoSelecionada =
                eventoLeitura.target.result;

            mostrarFoto(fotoSelecionada);
        };

        leitor.readAsDataURL(arquivo);
    });

function mostrarFoto(foto) {
    const imagens = [
        document.getElementById("fotoPerfil"),
        document.getElementById("fotoUsuarioTopo")
    ];

    const icones = [
        document.getElementById("iconePerfil"),
        document.getElementById("iconeUsuarioTopo")
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

function salvarPerfil(evento) {
    evento.preventDefault();

    const perfilAnterior = obterPerfil();

    const nome =
        document.getElementById("nomeCompleto")
            .value
            .trim();

    if (nome === "") {
        mostrarMensagem("Digite seu nome completo.");
        return;
    }

    const perfil = {
        ...perfilAnterior,

        nome: nome,

        dataNascimento:
            document.getElementById("dataNascimento")
                .value,

        genero:
            document.getElementById("genero")
                .value,

        email:
            document.getElementById("emailPerfil")
                .value
                .trim(),

        telefone:
            document.getElementById("telefonePerfil")
                .value
                .trim(),

        localizacao:
            document.getElementById("localizacao")
                .value
                .trim(),

        cultivos:
            document.getElementById("cultivos")
                .value
                .trim(),

        foto:
            fotoSelecionada ||
            perfilAnterior.foto ||
            ""
    };

    try {
        localStorage.setItem(
            CHAVE_PERFIL,
            JSON.stringify(perfil)
        );

        mostrarMensagem("Perfil salvo com sucesso!");
        carregarPerfil();
    } catch (erro) {
        mostrarMensagem(
            "A imagem é muito grande. Escolha uma foto menor."
        );
    }
}

function carregarPerfil() {
    const perfil = obterPerfil();

    fotoSelecionada = perfil.foto || "";

    mostrarFoto(fotoSelecionada);

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

    document.getElementById("localizacao").value =
        perfil.localizacao || "";

    document.getElementById("cultivos").value =
        perfil.cultivos || "";

    if (perfil.nome) {
        const primeiroNome =
            perfil.nome.trim().split(" ")[0];

        document.getElementById("nomeUsuarioTopo")
            .textContent =
            "Olá, " + primeiroNome + "!";
    }
}

function salvarNovaSenha(evento) {
    evento.preventDefault();

    const senhaAtual =
        document.getElementById("senhaAtual").value;

    const novaSenha =
        document.getElementById("novaSenha").value;

    const confirmar =
        document.getElementById("confirmarNovaSenha")
            .value;

    const senhaSalva =
        localStorage.getItem("senha");

    if (
        senhaAtual === "" ||
        novaSenha === "" ||
        confirmar === ""
    ) {
        mostrarMensagem("Preencha todos os campos.");
        return;
    }

    if (
        senhaSalva &&
        senhaAtual !== senhaSalva
    ) {
        mostrarMensagem("A senha atual está incorreta.");
        return;
    }

    if (novaSenha !== confirmar) {
        mostrarMensagem(
            "As novas senhas não coincidem."
        );

        return;
    }

    localStorage.setItem("senha", novaSenha);

    document.getElementById("senhaAtual").value = "";
    document.getElementById("novaSenha").value = "";
    document.getElementById("confirmarNovaSenha").value = "";

    mostrarMensagem("Senha alterada com sucesso!");
}

function mostrarInstrucoes() {
    document.getElementById("modalInstrucoes")
        .classList.add("ativo");
}

function fecharModal() {
    document.getElementById("modalInstrucoes")
        .classList.remove("ativo");
}

function sairDaConta() {
    const confirmar = confirm(
        "Deseja realmente sair da sua conta?"
    );

    if (!confirmar) {
        return;
    }

    window.location.href = "telainicial.html";
}

function excluirConta() {
    const confirmar = confirm(
        "Tem certeza que deseja excluir sua conta? Os dados salvos neste navegador serão apagados."
    );

    if (!confirmar) {
        return;
    }

    localStorage.removeItem(CHAVE_PERFIL);
    localStorage.removeItem(CHAVE_CONFIGURACOES);
    localStorage.removeItem("usuario");
    localStorage.removeItem("email");
    localStorage.removeItem("senha");
    localStorage.removeItem("brainstormPublicacoes");

    alert("Conta excluída com sucesso.");

    window.location.href = "telainicial.html";
}

function mostrarTermos() {
    alert(
        "Termos de Uso: utilize o Brainstorm Agrícola de forma responsável e respeite os demais usuários."
    );
}

function mostrarSuporte() {
    alert(
        "Suporte Brainstorm Agrícola\nE-mail: brainstormagricola@gmail.com\nTelefone: (49) 99928-6024"
    );
}

function mostrarDispositivos() {
    alert(
        "Dispositivo conectado: navegador atual."
    );
}

function mostrarPermissoes() {
    alert(
        "Permissões utilizadas: armazenamento local, fotos escolhidas pelo usuário e notificações quando autorizadas."
    );
}

function mostrarPolitica() {
    alert(
        "Política de Privacidade: os dados deste protótipo ficam armazenados somente no navegador utilizado."
    );
}

function mostrarMensagem(texto) {
    const mensagem =
        document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.classList.add("mostrar");

    setTimeout(function() {
        mensagem.classList.remove("mostrar");
    }, 2600);
}

carregarPerfil();
carregarConfiguracoes();