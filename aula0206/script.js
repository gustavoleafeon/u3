
function mudarEstilo() {
    const botao = document.getElementById("meuBotao");
    botao.style.backgroundColor = "red";
    botao.style.color = "white";
    botao.style.fontSize = "10rem 5rem";
    botao.style.border = "none";
    botao.style.borderRadius = "5px";
}

const meuIntervalo = setInterval(mover, 10);

function mover() {
    const caixa = document.getElementById("caixa");
    let position = parseInt(caixa.style.left) || 0;
    if (position >= 300) {
        clearInterval(meuIntervalo);
    } else {
        position += 2;
        caixa.style.left = position + "px";
    }      
}

const caixa3 = document.getElementById("caixa3");
setTimeout(iniciarAnimacao, 1000);
function iniciarAnimacao() {
    let position = 0;
    function mover1 () {
        if (position < 200) {
            position += 50;
            caixa3.style.left = position + "px";
            caixa3.style.backgroundColor = '#3dbe73';
            setTimeout(mover1, 20)
        }

    }
    mover1();
}

const botao = document.getElementById("botao-alterar");
const elemento = document.getElementById("meu-elemento");

botao.addEventListener("click", () => {
    elemento.style.backgroundColor = 'salmon';
    elemento.style.fontSize = '24px';
    elemento.style.display = 'block';
});

const elemento1 = document.getElementById("meu-elemento1");
const btnAlternar =document.getElementById("botao-alternar");
const btnResetar = document.getElementById("botao-reset");

btnAlternar.addEventListener("click", () => {
    elemento1.classList.toggle("ativo");
}); 
btnReset.addEventListener("click", () => {
    elemento1.classList.remove("ativo");
    elemento1.classList.remove("destaque");
});
setTimeout(() => {
    elemento1.classList.add("destaque");   
}, 2000);