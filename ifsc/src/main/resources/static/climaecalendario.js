let escolha = "";



function selecionar(tipo, elemento){


    escolha = tipo;



    document.querySelectorAll(".opcao")
    .forEach(function(item){


        item.classList.remove("selecionado");


    });



    elemento.classList.add("selecionado");



}



function acessar(){



    if(escolha === ""){


        alert("Selecione Calendário ou Clima!");

        return;


    }



    if(escolha === "calendario"){


        window.location.href = "calendario.html";


    }



    if(escolha === "clima"){


        window.location.href = "clima.html";


    }



}