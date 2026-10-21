// === MODEL (Dados e Negócio) ===
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
    
    obterTotal() {
        return this.carrinho.reduce((acc, item) => acc + item.preco, 0).toFixed(2);
    }
};

// === VIEW (Interface do Usuário) ===
const View = {
    renderizarProdutos(produtos) {
        const grid = document.getElementById('produtos');
        grid.innerHTML = produtos.map(p => `
            <div class="card">
                <h3>${p.nome}</h3>
                <p>R$ ${p.preco.toFixed(2)}</p>
                <button onclick="controller.adicionarItem(${p.id})">Adicionar</button>
            </div>
        `).join('');
    },
    
    atualizarCarrinho(carrinho, total) {
        document.getElementById('cart-count').innerText = carrinho.length;
        document.getElementById('cart-total').innerText = total;
        
        const list = document.getElementById('cart-items');
        list.innerHTML = carrinho.map(item => `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`).join('');
    }
};

// === CONTROLLER (Interação) ===
const controller = {
    init() {
        View.renderizarProdutos(Model.produtos);
    },
    
    adicionarItem(id) {
        Model.adicionarAoCarrinho(id);
        View.atualizarCarrinho(Model.carrinho, Model.obterTotal());
    },
    
    finalizarPedido() {
        if (Model.carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        alert(`Pedido realizado com sucesso! Total: R$ ${Model.obterTotal()}`);
        Model.carrinho = [];
        View.atualizarCarrinho(Model.carrinho, "0.00");
    }
};

document.addEventListener('DOMContentLoaded', () => controller.init());
