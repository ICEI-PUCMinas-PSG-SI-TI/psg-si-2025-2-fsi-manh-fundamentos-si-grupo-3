let carrinho = [];
  let desconto = 0;

  function adicionarAoCarrinho(nome, preco, imagem) {
    const itemExistente = carrinho.find(item => item.nome === nome);
    if (itemExistente) {
      itemExistente.quantidade++;
    } else {
      carrinho.push({ nome, preco, quantidade: 1, imagem });
    }
    atualizarCarrinho();
  }

  function alterarQuantidade(index, delta) {
    let item = carrinho[index];
    if (!item) return;
    item.quantidade += delta;
    if (item.quantidade < 1) {
      carrinho.splice(index, 1);
    }
    atualizarCarrinho();
  }

  function atualizarCarrinho() {
    const container = document.getElementById('carrinho-container');
    const lista = document.getElementById('itens-carrinho');
    lista.innerHTML = '';
    let subtotal = 0;

    if (carrinho.length === 0) {
      container.classList.add('oculto');
      return;
    } else {
      container.classList.remove('oculto');
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
      btnMenos.title = 'Diminuir quantidade';
      btnMenos.onclick = () => alterarQuantidade(index, -1);

      const inputQuant = document.createElement('input');
      inputQuant.className = 'quant-input';
      inputQuant.type = 'text';
      inputQuant.value = item.quantidade;
      inputQuant.readOnly = true;

      const btnMais = document.createElement('button');
      btnMais.className = 'quant-btn';
      btnMais.textContent = '+';
      btnMais.title = 'Aumentar quantidade';
      btnMais.onclick = () => alterarQuantidade(index, +1);

      quantControls.appendChild(btnMenos);
      quantControls.appendChild(inputQuant);
      quantControls.appendChild(btnMais);

      li.appendChild(imgDiv);
      li.appendChild(nomeSpan);
      li.appendChild(quantControls);

      lista.appendChild(li);

      subtotal += item.preco * item.quantidade;
    });

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('desconto').textContent = `R$ ${desconto.toFixed(2).replace('.', ',')}`;
    const total = subtotal - desconto;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Seu carrinho está vazio!');
    } else {
      const totalFinal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0) - desconto;
      alert(`Compra finalizada! Total: R$ ${totalFinal.toFixed(2).replace('.', ',')}`);
      carrinho = [];
      atualizarCarrinho();
    }
  }