function mostrarDetalhes(tipo){


let caixa = document.getElementById("detalhes");



if(tipo === "vento"){


caixa.innerHTML = `

<h3> Detalhes do vento</h3>

<br>

<p>Velocidade: 12 km/h</p>

<p>Direção: Sudeste</p>

<p>Condição favorável para atividades agrícolas.</p>

`;

}



if(tipo === "orvalho"){


caixa.innerHTML = `

<h3> Ponto de orvalho</h3>

<br>

<p>Temperatura: 18°C</p>

<p>Indica a quantidade de umidade presente no ar.</p>

`;

}



if(tipo === "nascer"){


caixa.innerHTML = `

<h3> Nascer do sol</h3>

<br>

<p>Horário previsto: 06:20</p>

<p>Boa luminosidade para atividades no campo.</p>

`;

}



if(tipo === "por"){


caixa.innerHTML = `

<h3> Pôr do sol</h3>

<br>

<p>Horário previsto: 18:10</p>

<p>Encerramento do período de luz solar.</p>

`;

}


}