/*
 * Sessão do usuário (carregado no <head> de todas as páginas, menos index.html).
 *
 * - Sem login salvo no navegador  -> manda pra telainicial.html (login).
 * - Com login salvo (token)       -> entra direto; telainicial.html já pula pra home.html.
 * - Token que o servidor não reconhece mais -> apaga a sessão e volta pro login.
 *
 * Guardado no localStorage: "token" e os dados do cadastro (nome, email, usuario) dentro de
 * "brainstormPerfil". A SENHA nunca é guardada.
 */
(function () {
    "use strict";

    var CHAVE_TOKEN = "token";
    var CHAVE_PERFIL = "brainstormPerfil";
    var PAGINA_LOGIN = "telainicial.html";
    var PAGINA_INICIAL = "home.html";
    var API = "/api";

    function lerToken() {
        try {
            return localStorage.getItem(CHAVE_TOKEN);
        } catch (erro) {
            return null;
        }
    }

    function lerPerfil() {
        try {
            return JSON.parse(localStorage.getItem(CHAVE_PERFIL)) || {};
        } catch (erro) {
            return {};
        }
    }

    // Guarda os dados do cadastro (vindos do servidor) no perfil em cache.
    function mesclarPerfil(dados) {
        if (!dados || !dados.usuario) {
            return;
        }

        var atual = lerPerfil();

        // mesma conta (ou perfil antigo sem dono): mantém foto, telefone etc.
        // conta diferente: começa limpo pra não herdar dados da conta anterior.
        var mesmaConta = !atual.usuario || atual.usuario === dados.usuario;
        var perfil = mesmaConta ? atual : {};

        perfil.usuario = dados.usuario;

        if (!perfil.nome) {
            perfil.nome = dados.nome;
        }

        if (!perfil.email) {
            perfil.email = dados.email;
        }

        try {
            localStorage.setItem(CHAVE_PERFIL, JSON.stringify(perfil));
        } catch (erro) {
            // sem espaço/permissão: segue sem cache
        }
    }

    function salvarSessao(dados) {
        localStorage.setItem(CHAVE_TOKEN, dados.token);
        mesclarPerfil(dados);
    }

    function limparSessao() {
        try {
            localStorage.removeItem(CHAVE_TOKEN);
        } catch (erro) {
            // ignora
        }
    }

    // Pergunta ao servidor se o token ainda vale: "valida", "invalida" ou "indisponivel" (servidor fora do ar).
    function consultarSessao(token) {
        return fetch(API + "/me", { headers: { "Authorization": "Bearer " + token } })
            .then(function (resposta) {
                if (resposta.status === 401) {
                    return "invalida";
                }

                if (!resposta.ok) {
                    return "indisponivel";
                }

                return resposta.json().then(function (dados) {
                    mesclarPerfil(dados);
                    return "valida";
                });
            })
            .catch(function () {
                return "indisponivel";
            });
    }

    window.BrainstormAuth = {
        salvarSessao: salvarSessao,
        limparSessao: limparSessao,
        estaLogado: function () { return !!lerToken(); }
    };

    var pagina = window.location.pathname.split("/").pop();
    var token = lerToken();

    if (pagina === PAGINA_LOGIN) {
        // já logado e com sessão válida: pula o login
        if (token) {
            consultarSessao(token).then(function (estado) {
                if (estado === "valida") {
                    window.location.replace(PAGINA_INICIAL);
                } else if (estado === "invalida") {
                    limparSessao();
                }
            });
        }
    } else if (!token) {
        // página protegida sem login: vai pro login
        window.location.replace(PAGINA_LOGIN);
    } else {
        consultarSessao(token).then(function (estado) {
            if (estado === "invalida") {
                limparSessao();
                window.location.replace(PAGINA_LOGIN);
            }
        });
    }
})();
