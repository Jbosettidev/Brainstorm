function selecionarCultura(nome, elemento) {
    const campoCultura = document.getElementById("cultura");
    const imgSoja = document.getElementById("imgSoja");
    const imgMilho = document.getElementById("imgMilho");

    campoCultura.value = nome;

    document.querySelectorAll(".cultura-card").forEach(function(card) {
        card.classList.remove("selecionada");
    });

    elemento.classList.add("selecionada");

    imgSoja.src = "iconesojaP.png";
    imgMilho.src = "iconemilhoP.png";

    if (nome === "Soja") {
        imgSoja.src = "iconesojaC.png";
    } else if (nome === "Milho") {
        imgMilho.src = "iconemilhoC.png";
    }
}

function gerarRecomendacao() {
    const cultura = document
        .getElementById("cultura")
        .value
        .trim()
        .toLowerCase();

    const estagio = document
        .getElementById("estagio")
        .value
        .trim()
        .toLowerCase();

    const resultado = document.getElementById("resultado");

    if (cultura === "") {
        resultado.textContent = "Selecione primeiro a cultura.";
        return;
    }

    if (estagio === "") {
        resultado.textContent = "Informe o estágio da lavoura.";
        return;
    }

    let recomendacao = "";

    if (cultura === "soja") {
        if (
            estagio.includes("germinação") ||
            estagio.includes("germinacao")
        ) {
            recomendacao =
                "Mantenha o solo úmido, sem encharcamento, e monitore pragas iniciais.";
        } else if (
            estagio.includes("crescimento") ||
            estagio.includes("vegetativo")
        ) {
            recomendacao =
                "Monitore plantas daninhas, pragas e o desenvolvimento das folhas.";
        } else if (estagio.includes("floração")) {
            recomendacao =
                "Evite estresse hídrico e acompanhe a presença de insetos nas flores.";
        } else if (
            estagio.includes("enchimento") ||
            estagio.includes("grãos") ||
            estagio.includes("graos")
        ) {
            recomendacao =
                "Mantenha boa disponibilidade de água e monitore doenças nas vagens.";
        } else if (
            estagio.includes("maturação") ||
            estagio.includes("maturacao") ||
            estagio.includes("colheita")
        ) {
            recomendacao =
                "Verifique a umidade dos grãos e programe a colheita para evitar perdas.";
        } else {
            recomendacao =
                "Estágio não reconhecido. Tente: Germinação, Crescimento, Floração, Enchimento de grãos ou Colheita.";
        }
    } else if (cultura === "milho") {
        if (
            estagio.includes("germinação") ||
            estagio.includes("germinacao")
        ) {
            recomendacao =
                "Garanta irrigação leve e uniforme e observe falhas na emergência.";
        } else if (
            estagio.includes("crescimento") ||
            estagio.includes("vegetativo")
        ) {
            recomendacao =
                "Realize o controle de plantas daninhas e monitore lagartas e deficiência de nutrientes.";
        } else if (estagio.includes("floração")) {
            recomendacao =
                "Evite falta de água, pois essa fase é importante para a formação das espigas.";
        } else if (
            estagio.includes("enchimento") ||
            estagio.includes("grãos") ||
            estagio.includes("graos")
        ) {
            recomendacao =
                "Monitore a umidade do solo e acompanhe o desenvolvimento dos grãos.";
        } else if (
            estagio.includes("maturação") ||
            estagio.includes("maturacao") ||
            estagio.includes("colheita")
        ) {
            recomendacao =
                "Observe a secagem dos grãos e escolha o momento adequado para a colheita.";
        } else {
            recomendacao =
                "Estágio não reconhecido. Tente: Germinação, Crescimento, Floração, Enchimento de grãos ou Colheita.";
        }
    }

    resultado.textContent = recomendacao;
}