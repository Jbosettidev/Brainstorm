function carregarPerfilNaHome() {
    const dados =
        localStorage.getItem("brainstormPerfil");

    if (!dados) {
        return;
    }

    const perfil = JSON.parse(dados);

    const nome =
        document.getElementById("nomeUsuarioHome");

    const foto =
        document.getElementById("fotoUsuarioHome");

    const icone =
        document.getElementById("iconeUsuarioHome");

    if (perfil.nome) {
        const primeiroNome =
            perfil.nome.trim().split(" ")[0];

        nome.textContent =
            "Olá, " + primeiroNome + "!";
    }

    if (perfil.foto) {
        foto.src = perfil.foto;
        foto.style.display = "block";
        icone.style.display = "none";
    }
}

carregarPerfilNaHome();