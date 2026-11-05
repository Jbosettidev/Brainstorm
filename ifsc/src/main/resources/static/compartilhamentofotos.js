const CHAVE_PUBLICACOES = "brainstormPublicacoes";

let publicacoes =
    JSON.parse(localStorage.getItem(CHAVE_PUBLICACOES)) || [];

let imagemSelecionada = "";

const inputImagem = document.getElementById("inputImagem");
const imagemPreview = document.getElementById("imagemPreview");
const textoPublicacao = document.getElementById("textoPublicacao");
const listaPublicacoes = document.getElementById("listaPublicacoes");
const semPublicacoes = document.getElementById("semPublicacoes");
const mensagemPublicacao =
    document.getElementById("mensagemPublicacao");

document
    .getElementById("botaoEscolherFoto")
    .addEventListener("click", function() {
        inputImagem.click();
    });

inputImagem.addEventListener("change", function(evento) {
    const arquivo = evento.target.files[0];

    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        mostrarMensagem("Selecione um arquivo de imagem.");
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(eventoLeitura) {
        imagemSelecionada = eventoLeitura.target.result;

        imagemPreview.src = imagemSelecionada;
        imagemPreview.style.display = "block";
    };

    leitor.readAsDataURL(arquivo);
});

document
    .getElementById("botaoPublicar")
    .addEventListener("click", criarPublicacao);

function criarPublicacao() {
    const texto = textoPublicacao.value.trim();

    if (texto === "" && imagemSelecionada === "") {
        mostrarMensagem(
            "Escreva uma mensagem ou escolha uma foto."
        );

        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        texto: texto,
        imagem: imagemSelecionada,
        data: new Date().toLocaleString("pt-BR"),
        curtido: false,
        comentarios: []
    };

    publicacoes.unshift(novaPublicacao);

    salvarPublicacoes();
    limparFormulario();
    mostrarPublicacoes();
}

function salvarPublicacoes() {
    try {
        localStorage.setItem(
            CHAVE_PUBLICACOES,
            JSON.stringify(publicacoes)
        );
    } catch (erro) {
        mostrarMensagem(
            "A imagem é muito grande. Tente escolher uma imagem menor."
        );
    }
}

function mostrarPublicacoes() {
    listaPublicacoes.innerHTML = "";

    semPublicacoes.style.display =
        publicacoes.length === 0 ? "block" : "none";

    publicacoes.forEach(function(publicacao) {
        const postagem = document.createElement("article");
        postagem.className = "postagem";

        const cabecalho = document.createElement("div");
        cabecalho.className = "postagem-cabecalho";

        const dadosUsuario = document.createElement("div");
        dadosUsuario.className = "dados-usuario";

        dadosUsuario.innerHTML = `
            <i class="fa-solid fa-circle-user"></i>

            <div>
                <span class="nome-usuario">Você</span>
                <span class="data-publicacao"></span>
            </div>
        `;

        dadosUsuario.querySelector(".data-publicacao").textContent =
            publicacao.data;

        cabecalho.appendChild(dadosUsuario);
        postagem.appendChild(cabecalho);

        if (publicacao.texto !== "") {
            const texto = document.createElement("p");

            texto.className = "texto-postagem";
            texto.textContent = publicacao.texto;

            postagem.appendChild(texto);
        }

        if (publicacao.imagem !== "") {
            const imagem = document.createElement("img");

            imagem.className = "imagem-postagem";
            imagem.src = publicacao.imagem;
            imagem.alt = "Imagem publicada";

            postagem.appendChild(imagem);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes-postagem";

        const botaoCurtir = document.createElement("button");
        botaoCurtir.className =
            "acao" + (publicacao.curtido ? " curtido" : "");

        botaoCurtir.innerHTML = publicacao.curtido
            ? '<i class="fa-solid fa-heart"></i> Curtido'
            : '<i class="fa-regular fa-heart"></i> Curtir';

        botaoCurtir.addEventListener("click", function() {
            curtirPublicacao(publicacao.id);
        });

        const botaoComentario = document.createElement("button");
        botaoComentario.className = "acao";
        botaoComentario.innerHTML =
            '<i class="fa-regular fa-comment"></i> Comentar';

        const botaoCompartilhar = document.createElement("button");
        botaoCompartilhar.className = "acao";
        botaoCompartilhar.innerHTML =
            '<i class="fa-solid fa-share"></i> Compartilhar';

        botaoCompartilhar.addEventListener("click", function() {
            alert("Publicação compartilhada com sucesso!");
        });

        const botaoExcluir = document.createElement("button");
        botaoExcluir.className = "acao acao-excluir";
        botaoExcluir.innerHTML =
            '<i class="fa-solid fa-trash"></i> Excluir';

        botaoExcluir.addEventListener("click", function() {
            excluirPublicacao(publicacao.id);
        });

        acoes.appendChild(botaoCurtir);
        acoes.appendChild(botaoComentario);
        acoes.appendChild(botaoCompartilhar);
        acoes.appendChild(botaoExcluir);

        postagem.appendChild(acoes);

        const areaComentarios = criarAreaComentarios(publicacao);

        botaoComentario.addEventListener("click", function() {
            const campo =
                areaComentarios.querySelector(".campo-comentario");

            campo.focus();
        });

        postagem.appendChild(areaComentarios);
        listaPublicacoes.appendChild(postagem);
    });
}

function criarAreaComentarios(publicacao) {
    const area = document.createElement("div");
    area.className = "comentarios";

    const formulario = document.createElement("div");
    formulario.className = "novo-comentario";

    const campo = document.createElement("input");
    campo.className = "campo-comentario";
    campo.type = "text";
    campo.placeholder = "Escreva um comentário...";

    const botao = document.createElement("button");
    botao.className = "botao-comentar";
    botao.type = "button";
    botao.innerHTML = '<i class="fa-solid fa-paper-plane"></i>';

    function enviarComentario() {
        adicionarComentario(publicacao.id, campo.value);
    }

    botao.addEventListener("click", enviarComentario);

    campo.addEventListener("keydown", function(evento) {
        if (evento.key === "Enter") {
            enviarComentario();
        }
    });

    formulario.appendChild(campo);
    formulario.appendChild(botao);

    const lista = document.createElement("div");
    lista.className = "lista-comentarios";

    publicacao.comentarios.forEach(function(textoComentario) {
        const comentario = document.createElement("div");
        comentario.className = "comentario";

        const autor = document.createElement("strong");
        autor.textContent = "Você:";

        const texto = document.createTextNode(
            " " + textoComentario
        );

        comentario.appendChild(autor);
        comentario.appendChild(texto);
        lista.appendChild(comentario);
    });

    area.appendChild(formulario);
    area.appendChild(lista);

    return area;
}

function curtirPublicacao(id) {
    const publicacao = publicacoes.find(function(item) {
        return item.id === id;
    });

    if (!publicacao) {
        return;
    }

    publicacao.curtido = !publicacao.curtido;

    salvarPublicacoes();
    mostrarPublicacoes();
}

function adicionarComentario(id, texto) {
    const comentario = texto.trim();

    if (comentario === "") {
        return;
    }

    const publicacao = publicacoes.find(function(item) {
        return item.id === id;
    });

    if (!publicacao) {
        return;
    }

    publicacao.comentarios.push(comentario);

    salvarPublicacoes();
    mostrarPublicacoes();
}

function excluirPublicacao(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir esta publicação?"
    );

    if (!confirmar) {
        return;
    }

    publicacoes = publicacoes.filter(function(publicacao) {
        return publicacao.id !== id;
    });

    salvarPublicacoes();
    mostrarPublicacoes();
}

function limparFormulario() {
    textoPublicacao.value = "";
    inputImagem.value = "";

    imagemSelecionada = "";

    imagemPreview.src = "";
    imagemPreview.style.display = "none";

    mensagemPublicacao.textContent = "";
}

function mostrarMensagem(texto) {
    mensagemPublicacao.textContent = texto;
}

mostrarPublicacoes();