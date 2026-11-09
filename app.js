// Model: Base de dados dos produtos com descrições (Feedback 1)
const produtos = [
    { id: 1, nome: "Cupcake de Chocolate", preco: 8.50, descricao: "Massa fofinha de cacau com recheio cremoso de brigadeiro belga. Aprox. 100g." },
    { id: 2, nome: "Cupcake de Baunilha", preco: 7.50, descricao: "Massa amanteigada de baunilha com cobertura suave de chantilly. Aprox. 90g." },
    { id: 3, nome: "Cupcake de Morango", preco: 9.00, descricao: "Massa de baunilha recheada com geleia artesanal de morango fresco. Aprox. 100g." },
    { id: 4, nome: "Cupcake de Red Velvet", preco: 10.00, descricao: "Massa vermelha aveludada com recheio clássico de cream cheese. Aprox. 110g." }
];

// Estado global do carrinho
let carrinho = [];

// View & Controller: Inicializa a aplicação carregando a vitrine
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos();
    atualizarCarrinho();
});

function renderizarProdutos() {
    const container = document.getElementById("lista-produtos");
    container.innerHTML = "";

    produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "card-produto";
        card.innerHTML = `
            <div>
                <h3>${produto.nome}</h3>
                <p class="descricao-produto">${produto.descricao}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            </div>
            <button id="btn-prod-${produto.id}" class="btn-primario" onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>
        `;
        container.appendChild(card);
    });
}

// Controller: Adiciona item e dispara feedback visual no botão (Feedback 4)
function adicionarAoCarrinho(id) {
    const produtoEncontrado = produtos.find(p => p.id === id);
    if (produtoEncontrado) {
        carrinho.push(produtoEncontrado);
        atualizarCarrinho();

        // Feedback 4: Efeito visual temporário no botão ("Adicionado!")
        const btn = document.getElementById(`btn-prod-${id}`);
        if (btn) {
            const textoOriginal = btn.innerText;
            btn.innerText = "Adicionado! ✓";
            btn.classList.add("btn-adicionado");
            
            setTimeout(() => {
                btn.innerText = textoOriginal;
                btn.classList.remove("btn-adicionado");
            }, 1000); // Retorna ao normal após 1 segundo
        }
    }
}

// Controller: Remove um item específico
function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Controller: Esvazia o carrinho de uma vez (Feedback 3)
function esvaziarCarrinho() {
    if (carrinho.length === 0) return;
    carrinho = [];
    atualizarCarrinho();
}

// View: Atualiza a interface do carrinho e o valor total
function atualizarCarrinho() {
    const lista = document.getElementById("itens-carrinho");
    const valorTotalEl = document.getElementById("valor-total");
    
    lista.innerHTML = "";

    if (carrinho.length === 0) {
        lista.innerHTML = `<li class="carrinho-vazio">O carrinho está vazio.</li>`;
        valorTotalEl.innerText = "R$ 0,00";
        return;
    }

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2).replace('.', ',')} <button class="btn-remover" onclick="removerItem(${index})">X</button></span>
        `;
        lista.appendChild(li);
    });

    valorTotalEl.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Controller: Simula a finalização do pedido
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("O seu carrinho está vazio. Adicione itens antes de finalizar!");
        return;
    }
    alert("Pedido finalizado com sucesso! Obrigado pela preferência.");
    carrinho = [];
    atualizarCarrinho();
}
