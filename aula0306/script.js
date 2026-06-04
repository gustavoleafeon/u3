const formulario = document.getElementById("formulario");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const telefone = document.getElementById("telefone");
const cpf = document.getElementById("cpf");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const RG = document.getElementById("RG");
const OE = document.getElementById("OE");
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