const API_URL = "/api";

function formatarPreco(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function formatarVariacao(valor) {
    const numero = Number(valor);
    const sinal = numero > 0 ? "+" : "";

    return sinal + numero.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + "%";
}

function formatarData(iso) {
    if (!iso) {
        return "--";
    }

    const partes = iso.split("-");

    return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function preencherCotacao(prefixo, cotacao) {
    const preco = document.getElementById(prefixo + "-preco");
    const variacao = document.getElementById(prefixo + "-var");
    const fechamento = document.getElementById(prefixo + "-fechamento");

    preco.textContent = formatarPreco(cotacao.preco);
    variacao.textContent = formatarVariacao(cotacao.variacao);
    variacao.classList.remove("positivo", "negativo");
    variacao.classList.add(Number(cotacao.variacao) >= 0 ? "positivo" : "negativo");
    fechamento.textContent = formatarData(cotacao.fechamento);
}

function mostrarIndisponivel() {
    ["soja", "milho"].forEach(function(prefixo) {
        document.getElementById(prefixo + "-preco").textContent = "Indisponível";
    });

    document.getElementById("tendencia-texto").textContent =
        "Não foi possível carregar os dados do mercado.";

    document.getElementById("impacto-texto").textContent =
        "Tente novamente em instantes.";
}

async function carregarCotacoes() {
    try {
        const resposta = await fetch(`${API_URL}/cotacoes`);

        if (!resposta.ok) {
            throw new Error("HTTP " + resposta.status);
        }

        const cotacoes = await resposta.json();

        const soja = cotacoes.find(function(c) { return c.cultura === "soja"; });
        const milho = cotacoes.find(function(c) { return c.cultura === "milho"; });

        if (soja) {
            preencherCotacao("soja", soja);
        }

        if (milho) {
            preencherCotacao("milho", milho);
        }

        const referencia = soja || milho;

        if (referencia) {
            document.getElementById("tendencia-texto").textContent = referencia.tendencia;
            document.getElementById("impacto-texto").textContent = referencia.impacto;
        }
    } catch (erro) {
        console.error(erro);
        mostrarIndisponivel();
    }
}

carregarCotacoes();
