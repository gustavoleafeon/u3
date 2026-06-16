// ============================================
// CONFIGURAÇÃO DA API (JSONPlaceholder - API real gratuita)
// ============================================
const API_USUARIOS = 'https://jsonplaceholder.typicode.com/users';

// ============================================
// EXEMPLO 1: MÉTODO GET (Pegar/Recuperar dados)
// ============================================
function exemploGet() {
    const statusDiv = document.getElementById('statusGet');
    const lista = document.getElementById('listaUsuarios');
    
    // Mostra loading
    statusDiv.innerHTML = '⏳ Buscando usuários da API... (GET)';
    statusDiv.className = 'status';
    lista.innerHTML = '<li>Carregando...</li>';
    
    // GET - Buscar dados da API
    fetch(API_USUARIOS)  // Requisição GET (padrão)
        .then(resposta => {
            if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
            return resposta.json(); // Converte a resposta para JSON
        })
        .then(usuarios => {
            // Exibe os usuários na tela
            const items = usuarios.map(usuario => {
                // Ícone SVG do LinkedIn (pequeno, embutido)
                const linkedinSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2" style="vertical-align:middle;margin-right:6px"><path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0zM9 8h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7C23 7.5 24 9.8 24 13.6V24h-5V14.6c0-2.2-.04-5-3-5-3 0-3.5 2.4-3.5 4.9V24H9V8z"/></svg>`;

                // Prioriza construir um link para LinkedIn usando o `username` quando disponível
                let linkHtml = '';
                if (usuario.username) {
                    const linkedinHref = 'https://www.linkedin.com/in/' + encodeURIComponent(String(usuario.username).toLowerCase());
                    // Mostrar a URL completa como texto do link, e entre parênteses o username
                    linkHtml = `| <a href="${linkedinHref}" target="_blank" rel="noopener noreferrer" class="usuario-linkedin">${linkedinSvg}${linkedinHref}</a> <span style="color:#666; font-size:12px;">(${usuario.username})</span>`;
                } else if (usuario.website) {
                    // Fallback: usa o website se não houver username
                    const site = usuario.website;
                    const siteHref = /^https?:\/\//i.test(site) ? site : 'http://' + site;
                    // Mostrar a URL completa do website como texto do link
                    linkHtml = `| <a href="${siteHref}" target="_blank" rel="noopener noreferrer" class="usuario-site">${linkedinSvg}${siteHref}</a> <span style="color:#666; font-size:12px;">(${usuario.website})</span>`;
                }

                return `
                    <li>
                        <div class="usuario-nome">👤 ${usuario.name}</div>
                        <div class="usuario-email">📧 ${usuario.email}</div>
                        <div style="font-size:12px; color:#999; margin-top:5px;">
                            📞 ${usuario.phone} ${linkHtml}
                        </div>
                    </li>
                `;
            }).join('');

            lista.innerHTML = items;

            statusDiv.innerHTML = `✅ GET concluído! ${usuarios.length} usuários carregados.`;
            statusDiv.classList.add('sucesso');
        })
        .catch(erro => {
            statusDiv.innerHTML = `❌ Erro no GET: ${erro.message}`;
            statusDiv.classList.add('erro');
            lista.innerHTML = '<li>❌ Erro ao carregar usuários</li>';
        });
}

// ============================================
// EXEMPLO 2: MÉTODO POST (Enviar/Criar dados)
// ============================================
function exemploPost(nome, email, phone) {
    const statusDiv = document.getElementById('statusPost');
    const resultadoDiv = document.getElementById('resultadoPost');
    
    // Valida os campos
    if (!nome || !nome.trim()) {
        alert('❌ Digite o nome do usuário');
        return;
    }
    
    if (!email || !email.trim()) {
        alert('❌ Digite o e-mail do usuário');
        return;
    }
    
    if (!phone || !phone.trim()) {
        alert('❌ Digite o telefone do usuário');
        return;
    }
    
    // valida formato do telefone: (11) 9999-9999 ou (11) 99999-9999
    const telefoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    if (!telefoneRegex.test(phone.trim())) {
        alert('❌ Formato de telefone inválido. Use (11) 99999-9999');
        return;
    }
    
    // Mostra loading
    statusDiv.innerHTML = '📤 Enviando dados para API... (POST)';
    statusDiv.className = 'status';
    resultadoDiv.innerHTML = '';
    
    // Dados a serem enviados
    const novoUsuario = {
        name: nome.trim(),
        email: email.trim(),
        phone: (phone && phone.trim()) ? phone.trim() : '(11) 99999-9999',
        website: 'exemplo.com'
    };
    
    // POST - Enviar dados para a API
    fetch(API_USUARIOS, {
        method: 'POST',                    // Método POST
        headers: {                         // Cabeçalhos
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoUsuario)  // Converte dados para JSON
    })
    .then(resposta => {
        if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
        return resposta.json(); // Retorna o usuário criado
    })
    .then(usuarioCriado => {
        // Exibe o resultado
        resultadoDiv.innerHTML = `
            <div class="resultado-box">
                <strong>✅ Usuário criado com sucesso!</strong><br>
                <strong>ID:</strong> ${usuarioCriado.id}<br>
                <strong>Nome:</strong> ${usuarioCriado.name}<br>
                <strong>E-mail:</strong> ${usuarioCriado.email}<br>
                <strong>Phone:</strong> ${usuarioCriado.phone}<br>
                <small style="color:#666;">(API retornou os dados salvos)</small>
            </div>
        `;
        
        statusDiv.innerHTML = `✅ POST concluído! Usuário "${usuarioCriado.name}" criado.`;
        statusDiv.classList.add('sucesso');
        
        // Limpa os campos
        document.getElementById('nome').value = '';
        document.getElementById('email').value = '';
        
        // Opcional: Recarrega a lista de usuários
        setTimeout(() => {
            if (confirm('Deseja recarregar a lista de usuários?')) {
                exemploGet();
            }
        }, 500);
    })
    .catch(erro => {
        statusDiv.innerHTML = `❌ Erro no POST: ${erro.message}`;
        statusDiv.classList.add('erro');
        resultadoDiv.innerHTML = `<div class="resultado-box" style="background:#fed7d7;border-left-color:#e53e3e;">
            ❌ Falha ao criar usuário: ${erro.message}
        </div>`;
    });
}

// ============================================
// EVENTOS DOS BOTÕES
// ============================================
document.getElementById('btnGet').addEventListener('click', exemploGet);
document.getElementById('btnPost').addEventListener('click', () => {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    // tenta obter telefone a partir de campos comuns
    const telefoneEl = document.getElementById('telefone') || document.getElementById('phone');
    const phone = telefoneEl ? telefoneEl.value : '';
    exemploPost(nome, email, phone);
});

// ============================================
// DEMONSTRAÇÃO: Síncrono vs Assíncrono
// ============================================
console.log('='.repeat(50));
console.log('🟢 DEMONSTRAÇÃO: Síncrono vs Assíncrono');
console.log('='.repeat(50));
console.log('🔵 [SÍNCRONO] 1. Este código executa PRIMEIRO');
console.log('🔵 [SÍNCRONO] 2. Executa linha por linha');

setTimeout(() => {
    console.log('🟢 [ASSÍNCRONO] 3. Este código executa DEPOIS, sem travar a tela!');
    console.log('✅ O GET e POST também são ASSÍNCRONOS!');
}, 0);

console.log('🔵 [SÍNCRONO] 4. Interface continua responsiva');
console.log('='.repeat(50) + '\n');

// ============================================
// CARREGA USUÁRIOS AUTOMATICAMENTE
// ============================================
exemploGet();