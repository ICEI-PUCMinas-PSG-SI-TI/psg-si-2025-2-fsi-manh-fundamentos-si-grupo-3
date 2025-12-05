let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let desconto = 0;

function adicionarAoCarrinho(item) {
    const nome = item.nome;
    const preco = item.preco || 0;
    const img = item.img;
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco: Number(preco) || 0, quantidade: 1, imagem });
  }
  salvarCarrinho();
  mostrarCarrinho();
}

function descontarEstoque(carrinho) {
    const estoque = JSON.parse(localStorage.getItem("produtos")) || [];

    carrinho.forEach(item => {
        if (!item.ingredientes) return;

        item.ingredientes.forEach(ing => {
            const prod = estoque.find(p => p.id === ing.id);
            if (prod) {
                prod.quantidade -= ing.quantidade * item.qtd;

                if (prod.quantidade < 0) 
                    prod.quantidade = 0;
            }
        });
    });

    localStorage.setItem("produtos", JSON.stringify(estoque));
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function mostrarCarrinho() {
  const sidebar = document.getElementById('cart-sidebar');
  sidebar.classList.remove('oculto');
  atualizarCarrinho();
}

function ocultarCarrinho() {
  const sidebar = document.getElementById('cart-sidebar');
  sidebar.classList.add('oculto');
}

function alterarQuantidade(index, delta) {
  let item = carrinho[index];
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade < 1) {
    carrinho.splice(index, 1);
  }
  salvarCarrinho();
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const container = document.getElementById('carrinho-container');
  const lista = document.getElementById('itens-carrinho');
  const vazioMsg = document.getElementById('carrinho-vazio');
  lista.innerHTML = '';
  let subtotal = 0;

  if (carrinho.length === 0) {
    container.classList.add('oculto');
    vazioMsg.classList.remove('oculto');
    ocultarCarrinho(); // Fecha automaticamente se vazio
    return;
  } else {
    container.classList.remove('oculto');
    vazioMsg.classList.add('oculto');
  }

  carrinho.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = 'item';

    const imgDiv = document.createElement('div');
    imgDiv.className = 'item-img';
    imgDiv.style.backgroundImage = `url('${item.imagem}')`;

    const nomeSpan = document.createElement('span');
    nomeSpan.className = 'item-nome';
    nomeSpan.textContent = item.nome;

    const quantControls = document.createElement('div');
    quantControls.className = 'quantidade-controls';

    const btnMenos = document.createElement('button');
    btnMenos.className = 'quant-btn';
    btnMenos.textContent = '-';
    btnMenos.onclick = () => alterarQuantidade(index, -1);

    const inputQuant = document.createElement('input');
    inputQuant.className = 'quant-input';
    inputQuant.type = 'text';
    inputQuant.value = item.quantidade;
    inputQuant.readOnly = true;

    const btnMais = document.createElement('button');
    btnMais.className = 'quant-btn';
    btnMais.textContent = '+';
    btnMais.onclick = () => alterarQuantidade(index, +1);

    quantControls.appendChild(btnMenos);
    quantControls.appendChild(inputQuant);
    quantControls.appendChild(btnMais);

    li.appendChild(imgDiv);
    li.appendChild(nomeSpan);
    li.appendChild(quantControls);

    lista.appendChild(li);

    subtotal += (Number(item.preco) || 0) * item.quantidade;
  });

  document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById('desconto').textContent = `R$ ${desconto.toFixed(2).replace('.', ',')}`;
  const total = subtotal - desconto;
  document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function finalizarCompra() {
  if (carrinho.length === 0) {  // Corrigido: 'cart' para 'carrinho'
    alert('Seu carrinho está vazio!');  // Mantém alerta simples, consistente com o resto
    return;  // Impede continuar se vazio
  } else {
    const totalFinal = carrinho.reduce((acc, item) => acc + (Number(item.preco) || 0) * item.quantidade, 0) - desconto;
    // alert(`Compra finalizada! Total: R$ ${totalFinal.toFixed(2).replace('.', ',')}`); comentei para mandar para outra pagina
    window.location.href = 'checkout.html'
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();  // Isso já chama ocultarCarrinho() se vazio
  }
}

// Evento para fechar o painel
document.getElementById('close-cart').addEventListener('click', ocultarCarrinho);