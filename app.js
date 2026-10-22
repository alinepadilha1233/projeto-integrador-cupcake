// Dentro do arquivo app.js, na função atualizarCarrinho do objeto View:
const View = {
    // ... (mantém o resto igual)
    atualizarCarrinho(carrinho, total) {
        document.getElementById('cart-count').innerText = carrinho.length;
        document.getElementById('cart-total').innerText = total;
        
        const list = document.getElementById('cart-items');
        // Adicionamos um botão de remover (X) em cada item:
        list.innerHTML = carrinho.map((item, index) => `
            <li>
                ${item.nome} - R$ ${item.preco.toFixed(2)} 
                <button onclick="controller.removerItem(${index})" style="background: red; color: white; border: none; border-radius: 3px; padding: 2px 6px; cursor: pointer; margin-left: 10px;">X</button>
            </li>
        `).join('');
    }
};
