const formulario = document.getElementById("formulario");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const RG = document.getElementById("RG");
const OE = document.getElementById("OE");
const cidade = document.getElementById("Cidade");
const possuiFilhosInput = document.getElementById("possuiFilhos");
const mensagemSucesso = document.getElementById("mensagemSucesso");

formulario.addEventListener("submit", function(e) {
    e.preventDefault();

    let valido = true;

    if (!validarCampo(nome, "Nome é obrigatório")) {
        valido = false;
    }

    if (!validarEmail()) {
        valido = false;
    }

    if (!validarTelefone()) {
        valido = false;
    }

    if (!validarCPF()) {
        valido = false;
    }

    if (!validarRG()) {
        valido = false;
    }

    if (!validarOE()) {
        valido = false;
    }

    if (!validarSenha()) {
        valido = false;
    }

    if (!validarConfirmarSenha()) {
        valido = false;
    }

    // novas validações: Estado, Cidade e PossuiFilhos
    if (!validarEstado()) {
        valido = false;
    }

    if (!validarCidade()) {
        valido = false;
    }

    if (!validarPossuiFilhos()) {
        valido = false;
    }

    if (valido) {
        mensagemSucesso.textContent =
            "Formulário enviado com sucesso!";
    } else {
        mensagemSucesso.textContent = "";
    }
});

function mostrarErro(input, mensagem) {
    const campo = input.parentElement.parentElement;

    campo.classList.remove("sucesso");
    campo.classList.add("falha");

    campo.querySelector(".erro").textContent = mensagem;
}

function mostrarSucesso(input) {
    const campo = input.parentElement.parentElement;

    campo.classList.remove("falha");
    campo.classList.add("sucesso");

    campo.querySelector(".erro").textContent = "";
}

function validarCampo(input, mensagem) {
    if (input.value.trim() === "") {
        mostrarErro(input, mensagem);
        return false;
    }

    mostrarSucesso(input);
    return true;
}

function validarEmail() {

    const valor = email.value.trim();

    const regex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (valor === "") {
        mostrarErro(email, "E-mail é obrigatório");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarErro(email, "E-mail inválido");
        return false;
    }

    mostrarSucesso(email);
    return true;
}

function validarTelefone() {

    const valor = telefone.value.trim();

    const regex =
        /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

    if (valor === "") {
        mostrarErro(telefone, "Telefone é obrigatório");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarErro(telefone, "Telefone inválido");
        return false;
    }

    mostrarSucesso(telefone);
    return true;
}

function validarCPF() {

    const valor = cpf.value
        .replace(/\D/g, "");

    if (valor === "") {
        mostrarErro(cpf, "CPF é obrigatório");
        return false;
    }

    if (valor.length !== 11) {
        mostrarErro(cpf, "CPF deve ter 11 dígitos");
        return false;
    }

    mostrarSucesso(cpf);
    return true;
}

function validarRG() {

    const valor = RG.value
        .replace(/\D/g, "");

    if (valor === "") {
        mostrarErro(RG, "RG é obrigatório");
        return false;
    }

    if (valor.length !== 10) {
        mostrarErro(RG, "RG deve ter 10 dígitos");
        return false;
    }

    mostrarSucesso(RG);
    return true;
}

function validarOE() {
    const valor = OE.value.trim();

    if (valor === "") {
        mostrarErro(OE, "Orgão Expedidor é obrigatório");
        return false;
    }

    mostrarSucesso(OE);
    return true;
}

function validarSenha() {

    const valor = senha.value.trim();

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{7,}$/;

    if (valor === "") {
        mostrarErro(senha, "Senha é obrigatória");
        return false;
    }

    if (!regex.test(valor)) {
        mostrarErro(
            senha,
            "Senha deve ter no mínimo 7 caracteres, incluindo uma maiúscula, uma minúscula, um dígito e um caractere especial"
        );
        return false;
    }

    mostrarSucesso(senha);
    return true;
}

function validarConfirmarSenha() {
    const valor = confirmarSenha.value.trim();

    if (valor === "") {
        mostrarErro(confirmarSenha, "Confirmar senha é obrigatório");
        return false;
    }

    if (valor !== senha.value) {
        mostrarErro(confirmarSenha, "As senhas devem ser iguais");
        return false;
    }

    mostrarSucesso(confirmarSenha);
    return true;
}

// Pega o input de busca e a lista de produtos
const campoBusca = document.getElementById('campoBusca');
const listaProdutos = document.getElementById('listaEstados');
const Estados = listaProdutos.getElementsByClassName('Estado');
 
// Adiciona um evento que dispara sempre que algo é digitado
campoBusca.addEventListener('input', function() {
    // Pega o valor digitado e passa para minúsculo para evitar problemas de capitalização
    const textoDigitado = campoBusca.value.toLowerCase();
 
    // Percorre todos os produtos da lista
    for (let i = 0; i < Estados.length; i++) {
        const Estado = Estados[i];
        const textoEstado = Estado.textContent.toLowerCase();
 
        // Verifica se o texto digitado existe dentro do nome do produto
        if (textoEstado.includes(textoDigitado)) {
            // Remove a classe oculto para mostrar o produto
            Estado.classList.remove('oculto');
        } else {
            // Adiciona a classe oculto para esconder o produto
            Estado.classList.add('oculto');
        }
    }
});

// Mostrar a lista ao focar ou clicar no campo de busca
campoBusca.addEventListener('focus', () => listaProdutos.classList.remove('oculto'));
campoBusca.addEventListener('click', (e) => { listaProdutos.classList.remove('oculto'); e.stopPropagation(); });

// Evita que cliques dentro da lista fechem ela imediatamente
listaProdutos.addEventListener('click', (e) => e.stopPropagation());

// Fecha a lista ao clicar fora
document.addEventListener('click', (e) => {
    if (!campoBusca.contains(e.target) && !listaProdutos.contains(e.target)) {
        listaProdutos.classList.add('oculto');
    }
});

// Selecionar item da lista: preenche o campo e fecha a lista
for (let i = 0; i < Estados.length; i++) {
    Estados[i].addEventListener('click', function () {
        campoBusca.value = this.textContent.trim();
        // restaura visibilidade padrão (remove ocultos para próxima abertura)
        for (let j = 0; j < Estados.length; j++) Estados[j].classList.remove('oculto');
        listaProdutos.classList.add('oculto');
        // marca como sucesso o container do Estado
        try {
            const containerEstado = campoBusca.parentElement;
            mostrarSucessoContainer(containerEstado);
        } catch (e) {
            // silencioso se algo inesperado acontecer
            console.warn('Erro ao marcar sucesso do Estado:', e);
        }
    });
}

function desativarBotao() {
    const botoes = document.querySelectorAll('.botao-filhos');
    if (botoes.length >= 2) {
        // 'Não' button is the second
        botoes[0].disabled = false; // Sim volta ao normal
        botoes[1].disabled = true;  // Não fica desabilitado
    }
    // marca campo oculto
    if (possuiFilhosInput) {
        possuiFilhosInput.value = 'nao';
        const container = document.querySelector('.controles');
        mostrarSucessoContainer(container);
    }
    console.log('Botão "Não" desabilitado, "Sim" habilitado');
}
 
function ativarBotao() {
    const botoes = document.querySelectorAll('.botao-filhos');
    if (botoes.length >= 2) {
        // 'Sim' button is the first
        botoes[0].disabled = true;  // Sim fica desabilitado
        botoes[1].disabled = false; // Não volta ao normal
    }
    // marca campo oculto
    if (possuiFilhosInput) {
        possuiFilhosInput.value = 'sim';
        const container = document.querySelector('.controles');
        mostrarSucessoContainer(container);
    }
    console.log('Botão "Sim" desabilitado, "Não" habilitado');
}

// valida Estado (campoBusca) - verifica não vazio e corresponde a uma opção da lista
function validarEstado() {
    const valor = campoBusca.value.trim();
    const container = campoBusca.parentElement; // .campo
    if (valor === "") {
        mostrarErroContainer(container, "Estado é obrigatório");
        return false;
    }

    // verifica se corresponde exatamente a um dos itens
    let encontrado = false;
    for (let i = 0; i < Estados.length; i++) {
        if (Estados[i].textContent.trim().toLowerCase() === valor.toLowerCase()) {
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        mostrarErroContainer(container, "Escolha um Estado válido da lista");
        return false;
    }

    mostrarSucessoContainer(container);
    return true;
}

// valida Cidade (Cidade input não vazio)
function validarCidade() {
    const container = cidade.parentElement;
    if (cidade.value.trim() === "") {
        mostrarErroContainer(container, "Cidade é obrigatória");
        return false;
    }
    mostrarSucessoContainer(container);
    return true;
}

// helper para mostrar erro em container específico (usa .erro dentro do container)
function mostrarErroContainer(container, mensagem) {
    container.classList.remove('sucesso');
    container.classList.add('falha');
    const small = container.querySelector('.erro');
    if (small) small.textContent = mensagem;
}

function mostrarSucessoContainer(container) {
    container.classList.remove('falha');
    container.classList.add('sucesso');
    const small = container.querySelector('.erro');
    if (small) small.textContent = '';
}

// valida PossuiFilhos (verifica valor do campo oculto)
function validarPossuiFilhos() {
    const container = document.querySelector('.controles');
    const valor = possuiFilhosInput.value.trim().toLowerCase();
    if (valor !== 'sim' && valor !== 'nao') {
        mostrarErroContainer(container, 'Por favor selecione se possui filhos');
        return false;
    }
    mostrarSucessoContainer(container);
    return true;
}