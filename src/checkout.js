// Carregar itens do carrinho
const cartContainer = document.getElementById("cartItems");
const totalElement = document.getElementById("cartTotal");

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

function atualizarTela() {
    cartContainer.innerHTML = "";

    if (carrinho.length === 0) {
        cartContainer.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalElement.textContent = "R$ 0,00";
        return;
    }

    let total = 0;

    carrinho.forEach(item => {
        const itemHTML = document.createElement("div");
        itemHTML.className = "cart-item";

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        itemHTML.innerHTML = `
            <img src="${item.img}" alt="${item.nome}">
            <div class="item-info">
                <h4>${item.nome}</h4>
                <p>Quantidade: <strong>${item.quantidade}</strong></p>
            </div>
            <div>
                <p>R$ ${subtotal.toFixed(2)}</p>
            </div>
        `;

        cartContainer.appendChild(itemHTML);
    });

    totalElement.textContent = "R$ " + total.toFixed(2);
}

atualizarTela();

// Botão de confirmar pedido
document.getElementById("confirmBtn").addEventListener("click", () => {

    // Limpa o carrinho
    localStorage.removeItem("carrinho");

    // Redireciona para a home
    //window.location.href = "index.html";
});

document.getElementById("pagouBtn").addEventListener("click", () => {
    alert("Pedido confirmado! Saboreie cada mordida! 🍽️");

    // Redireciona para a home
    window.location.href = "index.html";
});

document.getElementById("button-addon2").addEventListener("click", () => {
    let enderecoConfirmado = document.getElementById("enderecoConfirmado");
    enderecoConfirmado.innerHTML = `<h4>Endereço de entrega: <strong>${document.getElementById("inputEndereco").value}</strong></h4>`
    
});
document.getElementById("inputEndereco").addEventListener("keydown", function(event) {
    let enderecoConfirmado = document.getElementById("enderecoConfirmado");
    if(event.key === 'Enter'){
    enderecoConfirmado.innerHTML = `<h4>Endereço de entrega: <strong>${document.getElementById("inputEndereco").value}</strong></h4>`
    event.preventDefault();
    }
    
});