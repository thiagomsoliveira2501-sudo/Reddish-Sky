
const listaFilmes = document.getElementById("listaFilmes");

const botaoAnterior = document.getElementById("anterior");

const botaoProximo = document.getElementById("proximo");

let animando = false;

function atualizarCentro() {

    const filmes = listaFilmes.children;

    for (let i = 0; i < filmes.length; i++) {

        filmes[i].classList.remove("filmeCentral");

    }

    filmes[1].classList.add("filmeCentral");

}

function moverFilmes(direcao) {

    if (animando) return;

    animando = true;

    const filmes = Array.from(listaFilmes.children);

    const posicoesAntigas = new Map();

    filmes.forEach(filme => {

        posicoesAntigas.set(filme, filme.offsetLeft);

    });

    if (direcao === "direita") {

        const primeiroFilme = listaFilmes.firstElementChild;

        listaFilmes.appendChild(primeiroFilme);

    } else {

        const ultimoFilme = listaFilmes.lastElementChild;

        listaFilmes.prepend(ultimoFilme);

    }

    atualizarCentro();

    const novosFilmes = Array.from(listaFilmes.children);

    novosFilmes.forEach(filme => {

        const posicaoAntiga = posicoesAntigas.get(filme);

        const novaPosicao = filme.offsetLeft;

        const diferenca = posicaoAntiga - novaPosicao;

        filme.style.transition = "none";

        filme.style.setProperty("--movimento", `${diferenca}px`);

    });

    listaFilmes.offsetHeight;

    requestAnimationFrame(() => {

        novosFilmes.forEach(filme => {

            filme.style.transition = "";

            filme.style.setProperty("--movimento", "0px");

        });

    });

    setTimeout(() => {

        animando = false;

    }, 900);

}

botaoProximo.addEventListener("click", function() {

    moverFilmes("direita");

});

botaoAnterior.addEventListener("click", function() {

    moverFilmes("esquerda");

});

document.addEventListener("keydown", function(evento) {

    if (evento.key === "ArrowRight") {

        moverFilmes("direita");

    }

    if (evento.key === "ArrowLeft") {

        moverFilmes("esquerda");

    }

});
