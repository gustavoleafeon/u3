const selecao = document.getElementById('tipagem');
const botao = document.getElementById('enviar');
const caixa = document.getElementById('meuPokemon');
const formulario = document.getElementById('meuForm');
const campoNome = document.getElementById('nomePokemon');


            selecao.addEventListener('change', function (evento) {
                console.log('cor selecionada: ' + evento.target.value);
            });

                 window.addEventListener('load', bemVindo);
            function bemVindo() {
                alert("Bem-vindo treinador!");
            }

             botao.addEventListener('click', function () {
                alert('sua escolha foi enviada!');
            });

            campoNome.addEventListener('focus', (evento) => {
                evento.target.style.backgroundColor = 'lightblue';
            });

            campoNome.addEventListener('blur', (evento) => {
                if (evento.target.value.trim() === '') {
                    alert('Por favor, preencha o nome do seu Pokémon.');
                }
            });
            formulario.addEventListener('reset', () => {
                alert('Formulário limpo!');
            });
            
            formulario.addEventListener('submit', (evento) => {
                if (campoNome.value.trim() === '') {    
                    alert('Por favor, preencha o nome do seu Pokémon.');
                    evento.preventDefault();    
                }
            });