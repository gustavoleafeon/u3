// Dados simulados
const cardapio = [
    { id: 1, nome: "Pizza Margherita", preco: 45.90, categoria: "Pizzas", disponivel: true },
    { id: 2, nome: "Hambúrguer Clássico", preco: 28.50, categoria: "Lanches", disponivel: true },
    { id: 3, nome: "Salada Caesar", preco: 32.00, categoria: "Saladas", disponivel: true },
    { id: 4, nome: "Sushi Special", preco: 89.90, categoria: "Japonesa", disponivel: false },
    { id: 5, nome: "Penne ao Pesto", preco: 38.00, categoria: "Massas", disponivel: true },
    { id: 6, nome: "Taco Mexicano", preco: 24.90, categoria: "Mexicana", disponivel: true }
];
 
const pedidos = [
    { id: 1001, cliente: "João Silva", itens: ["Pizza Margherita", "Sushi Special"], total: 135.80, status: "entregue" },
    { id: 1002, cliente: "Maria Santos", itens: ["Hambúrguer Clássico", "Salada Caesar"], total: 60.50, status: "preparando" },
    { id: 1003, cliente: "Carlos Oliveira", itens: ["Taco Mexicano"], total: 24.90, status: "pendente" },
    { id: 1004, cliente: "Ana Pereira", itens: ["Penne ao Pesto", "Pizza Margherita"], total: 83.90, status: "entregue" },
    { id: 1005, cliente: "Roberto Lima", itens: ["Sushi Special"], total: 89.90, status: "preparando" }
];
 
const clientes = [
    { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-1111" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-2222" },
    { id: 3, nome: "Carlos Oliveira", email: "carlos@email.com", telefone: "(11) 99999-3333" },
    { id: 4, nome: "Ana Pereira", email: "ana@email.com", telefone: "(11) 99999-4444" },
    { id: 5, nome: "Roberto Lima", email: "roberto@email.com", telefone: "(11) 99999-5555" }
];

function renderizarCardapio() {
    const container = document.getElementById('cardapioContainer');
    let html = '';

    for (const item of cardapio) {
        if (item.disponivel) {
            html += `
                <div class="card">
                    <h3>${item.nome}</h3>
                    <div class="price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="category">${item.categoria}</div>
                    <div style="margin-top: 10px; font-size: 0.85em; color: #28a745;">✓ Disponível</div>
                </div>
            `;
        } else {
            html += `
                <div class="card" style="opacity: 0.6; background: #f8f9fa;">
                    <h3>${item.nome}</h3>
                    <div class="price">R$ ${item.preco.toFixed(2)}</div>
                    <div class="category">${item.categoria}</div>
                    <div style="margin-top: 10px; font-size: 0.85em; color: #dc3545;">✗ Indisponível</div>
                </div>
            `;
        }
    }

    container.innerHTML = html;

}

function renderizarPedidos() {
    const tbody = document.getElementById('pedidosBody');
    let html = '';

    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        const statusClass = `status status-${pedido.status}`;

        const itensFormatados = pedido.itens.join(', ');
        
        html += `
            <tr>
                <td>${pedido.id}</td>
                <td>${pedido.cliente}</td>
                <td>${itensFormatados}</td>
                <td>R$ ${pedido.total.toFixed(2)}</td>
                <td> <span class="${statusClass}">${pedido.status.toUpperCase()}</span></td>
            </tr>
        `;
    }
    tbody.innerHTML = html;
}

function renderizarClientes() {
    const lista = document.getElementById('clientesList');
    let html = '';

    for (const cliente of clientes) {
        html += `
            <li class="Cliente-item">
        
                <div class="cliente-nome">${cliente.nome}</div>
                <div class="cliente-email">${cliente.email}</div>
                <div class="cliente-telefone">${cliente.telefone}</div>
            </li>
        `;
    }
    lista.innerHTML = html;
}

function renderizarEstatisticas() {
    