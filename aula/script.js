 const caixa = document.getElementById('minhacaixa');
  const botao = document.getElementById('meubotao');
  const selecao = document.getElementById('minhaselecao');

           
            botao.addEventListener('click', function () {
                alert('Botão clicado!');
            });

           
            caixa.addEventListener('mouseenter', function () {
                caixa.style.backgroundColor = 'lightblue';
            });

            selecao.addEventListener('change', function (evento) {
                console.log('cor selecionada: ' + evento.target.value);
            });

            window.addEventListener('load', paginaCarregada);
            function paginaCarregada() {
                alert("A Página foi totalmente carregada!");
            }
