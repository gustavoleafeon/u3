document.addEventListener('DOMContentLoaded', () => {
    const cepInput = document.getElementById('cep');
    const buscarBtn = document.getElementById('buscarBtn');
    const loading = document.getElementById('loading');
    const erro = document.getElementById('erro');
    const resultado = document.getElementById('resultado');

    // Se algum elemento obrigatório estiver faltando, evita exceções silenciosas
    if (!buscarBtn) return;

    // Passe a referência da função (sem chamar) ao listener
    buscarBtn.addEventListener('click', buscaCEP);

    async function buscaCEP() {
        if (resultado) resultado.innerHTML = '';
        if (erro) erro.innerHTML = '';

        // Usa .value (propriedade) e normaliza removendo caracteres não numéricos
        const cepRaw = cepInput ? cepInput.value : '';
        const cep = String(cepRaw).replace(/\D/g, '');

        if (cep.length !== 8) {
            if (erro) erro.textContent = 'CEP inválido. Digite um CEP com 8 dígitos.';
            return;
        }

        if (loading) loading.style.display = 'block';

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            if (!response.ok) throw new Error('Erro ao buscar CEP');

            const dados = await response.json();
            if (dados.erro) throw new Error('CEP não encontrado');

            if (resultado) {
                resultado.innerHTML = `
                    <div class="resultado">
                        <h3>Endereço encontrado:</h3>
                        <p><strong>Logradouro: </strong> ${dados.logradouro}</p>
                        <p><strong>Bairro: </strong> ${dados.bairro}</p>
                        <p><strong>Cidade: </strong> ${dados.localidade}</p>
                        <p><strong>UF: </strong> ${dados.uf}</p>
                    </div>
                `;
            }
        } catch (err) {
            if (erro) erro.textContent = err.message;
        } finally {
            if (loading) loading.style.display = 'none';
        }
    }
});
