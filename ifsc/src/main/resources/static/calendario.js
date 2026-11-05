let culturaEscolhida = "";



let diasBons = [

    3,
    6,
    7,
    12,
    14,
    18,
    20,
    24

];



function carregarCalendario(){


    let calendario = document.getElementById("diasCalendario");


    for(let dia = 1; dia <= 30; dia++){


        let div = document.createElement("div");


        div.classList.add("dia");


        div.innerHTML = dia;



        if(diasBons.includes(dia)){


            div.classList.add("recomendado");


            div.onclick = function(){

                mostrarInfo(dia);

            };


        }



        calendario.appendChild(div);


    }


}



carregarCalendario();





function selecionarCultura(cultura){


    culturaEscolhida = cultura;



    let titulo = document.getElementById("tituloCultura");



    if(cultura === "milho"){


        titulo.innerHTML =
        "🌽 Calendário de plantio - Milho";


    }



    if(cultura === "soja"){


        titulo.innerHTML =
        "🌱 Calendário de plantio - Soja";


    }


}





function mostrarInfo(dia){


    let caixa = document.getElementById("informacao");



    if(culturaEscolhida === ""){


        caixa.innerHTML =
        "Escolha primeiro uma cultura.";


        return;

    }function mostrarInfo(dia){


    let caixa = document.getElementById("informacao");



    if(culturaEscolhida === ""){


        caixa.innerHTML = 
        "🌱 Escolha primeiro uma cultura.";


        return;


    }



    let culturaTexto = "";



    if(culturaEscolhida === "milho"){

        culturaTexto = "🌽 Milho Safra";

    }


    else{

        culturaTexto = "🌱 Soja Safra";

    }



    caixa.innerHTML = `


    <div class="info-topo">


        <i class="fa-solid fa-seedling"></i>


        <h3>${dia} de Outubro</h3>


    </div>



    <p>

    <strong>Cultura:</strong>

    ${culturaTexto}

    </p>



    <br>



    <p>

    <strong>🌱 Motivo da recomendação:</strong>

    </p>



    <p>

    ✓ Umidade do solo favorável.<br>

    ✓ Temperatura adequada para germinação.<br>

    ✓ Previsão climática positiva para o desenvolvimento inicial.

    </p>



    <br>



    <p>

    <strong>Recomendação:</strong><br>

    Realizar o plantio neste período para aumentar as chances de bom estabelecimento da lavoura.

    </p>


    `;



}





    caixa.innerHTML =


    "📅 Dia " + dia +
    "<br><br>" +

    "🌱 Melhor período para plantio de "
    + culturaEscolhida +
    ".<br><br>" +

    "☀ Condições favoráveis de temperatura e umidade do solo.";



}