// === MODEL (Gerenciamento de Dados e Regras de Negócio) ===
const Model = {
    produtos: [
        { id: 1, nome: "Cupcake de Red Velvet", preco: 12.50 },
        { id: 2, nome: "Cupcake de Doce de Leite", preco: 10.00 },
        { id: 3, nome: "Cupcake de Nutella com Ninho", preco: 14.00 }
    ],
    carrinho: [],
    
    adicionarAoCarrinho(id) {
        const prod = this.produtos.find(p => p.id === id);
        if (prod) {
            this.carrinho.push(prod);
        }
    },

    removerDoCarrinho(index) {
        this.carrinho.splice(index, 1);
    },
    
    obterTotal() {
        return this.carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    }
};

// === VIEW (Renderização e Interface do Usuário) ===
const View = {
    renderizarProdutos(produtos) {
        const grid = document.getElementById('produtos');
        grid.innerHTML = produtos.map(p => `
            <div class="card">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco.toFixed(2).replace('.', ',')}</p>
                <button onclick="controller.adicionarItem(${p.id})">Adicionar</button>
            </div>
        `).join('');
    },
    
    atualizarCarrinho(carrinho, total) {
        document.getElementById('cart-count').innerText = carrinho.length;
        document.getElementById('cart-total').innerText = total.replace('.', ',');
        
        const list = document.getElementById('cart-items');
        if (carrinho.length === 0) {
            list.innerHTML = '<li>O carrinho está vazio.</li>';
            return;
        }

        list.innerHTML = carrinho.map((item, index) => `
            <li style="margin-bottom: 8px;">
                ${item.nome} - R$ ${item.preco.toFixed(2).replace('.', ',')}
                <button onclick="controller.removerItem(${index})" style="background-color: #dc3545; color: white; border: none; padding: 2px 8px; border-radius: 4px; cursor: pointer; margin-left: 10px; font-weight: bold;">X</button>
            </li>
        `).join('');
    }
};

// === CONTROLLER (Mediação de Ações) ===
const controller = {
    init() {
        View.renderizarProdutos(Model.produtos);
        View.atualizarCarrinho(Model.carrinho, Model.obterTotal());
    },
    
    adicionarItem(id) {
        Model.adicionarAoCarrinho(id);
        View.atualizarCarrinho(Model.carrinho, Model.obterTotal());
    },

    removerItem(index) {
        Model.removerDoCarrinho(index);
        View.atualizarCarrinho(Model.carrinho, Model.obterTotal());
    },
    
    finalizarPedido() {
        if (Model.carrinho.length === 0) {
            alert("Seu carrinho está vazio! Adicione itens antes de finalizar.");
            return;
        }
        alert(`Pedido realizado com sucesso!\nTotal da compra: R$ ${Model.obterTotal().replace('.', ',')}`);
        Model.carrinho = [];
        View.atualizarCarrinho(Model.carrinho, "0.00");
    }
};

document.addEventListener('DOMContentLoaded', () => controller.init());
