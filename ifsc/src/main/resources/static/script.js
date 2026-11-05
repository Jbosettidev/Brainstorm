let escolhaHome = "";


function selecionarHome(tipo, elemento){


    escolhaHome = tipo;


    document.querySelectorAll(".mini-item")
    .forEach(item => {

        item.classList.remove("selecionado");

    });


    elemento.classList.add("selecionado");


}



function acessarHome(){


 if(escolhaHome === "calendario"){

    window.location.href="calendario.html";

}


if(escolhaHome === "clima"){

    window.location.href="clima.html";

}

}
function acessarHome(){


    if(escolhaHome === ""){

        alert("Escolha Calendário ou Clima!");

        return;

    }


    if(escolhaHome === "calendario"){

        window.location.href="calendario.html";

    }


    if(escolhaHome === "clima"){

        window.location.href="clima.html";

    }


}
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