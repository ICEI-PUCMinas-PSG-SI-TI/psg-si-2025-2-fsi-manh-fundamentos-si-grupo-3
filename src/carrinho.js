let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let desconto = 0;

// Função para carregar estoque do localStorage (inicializa com valores padrão se vazio)
function carregarEstoque() {
  let estoque = JSON.parse(localStorage.getItem('estoque')) || {};
  // Inicializa estoque com valores padrão se vazio (baseado nos ingredientes dos dados)
  if (Object.keys(estoque).length === 0) {
    // Exemplo: define estoques iniciais (ajuste conforme necessário)
    estoque = {
      "Feijão": 100,
      "Carne de porco": 50,
      "Arroz": 30,
      "Picanha": 20,
      "Sal": 10,
      "Pimenta": 5,
      "Massa de pizza": 15,
      "Queijo": 25,
      "Tomate": 40,
      "Frango": 30,
      "Massa": 20,
      "Óleo": 10,
      "Carne moída": 25,
      "Massa de pastel": 15,
      "Cebola": 20,
      "Peixe": 15,
      "Coco": 10,
      "Azeite de dendê": 8,
      "Salmão": 12,
      "Limão": 30,
      "Ervas": 5,
      "Chocolate": 20,
      "Leite condensado": 15,
      "Manteiga": 10,
      "Açaí": 25,
      "Banana": 50,
      "Granola": 15
    };
    salvarEstoque(estoque);
  }
  return estoque;
}

// Função para salvar estoque no localStorage
function salvarEstoque(estoque) {
  localStorage.setItem('estoque', JSON.stringify(estoque));
}

function adicionarAoCarrinho(nome, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco: Number(preco) || 0, quantidade: 1, imagem });
  }
  salvarCarrinho();
  mostrarCarrinho();
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
    ocultarCarrinho();
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
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  } else {
    // Carrega estoque
    let estoque = carregarEstoque();
    let alertasEstoque = [];

    // Processa baixa nos ingredientes
    carrinho.forEach(item => {
      // Encontra o item original nos dados para acessar ingredientes
      let itemOriginal = null;
      for (let categoria in dados) {
        itemOriginal = dados[categoria].find(it => it.nome === item.nome);
        if (itemOriginal) break;
      }
      if (itemOriginal && itemOriginal.ingredientes) {
        itemOriginal.ingredientes.forEach(ing => {
          const quantidadeNecessaria = ing.quantidade * item.quantidade;
          if (estoque[ing.nome] !== undefined) {
            estoque[ing.nome] -= quantidadeNecessaria;
            if (estoque[ing.nome] < 0) {
              alertasEstoque.push(`${ing.nome} ficou com estoque negativo (${estoque[ing.nome].toFixed(2)}).`);
            }
          } else {
            alertasEstoque.push(`Ingrediente ${ing.nome} não encontrado no estoque.`);
          }
        });
      }
    });

    // Salva estoque atualizado
    salvarEstoque(estoque);

    // Calcula total e finaliza
    const totalFinal = carrinho.reduce((acc, item) => acc + (Number(item.preco) || 0) * item.quantidade, 0) - desconto;
    alert(`Compra finalizada! Total: R$ ${totalFinal.toFixed(2).replace('.', ',')}`);

    // Mostra alertas de estoque se houver
    if (alertasEstoque.length > 0) {
      alert('Avisos de estoque:\n' + alertasEstoque.join('\n'));
    }

    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
  }
}

// Evento para fechar o painel
document.getElementById('close-cart').addEventListener('click', ocultarCarrinho);

// Carrega estoque ao iniciar (opcional, mas garante que esteja pronto)
carregarEstoque();