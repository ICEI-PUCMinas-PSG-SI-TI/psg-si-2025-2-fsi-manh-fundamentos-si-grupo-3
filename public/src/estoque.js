const API = "http://localhost:3000/produtos";
const tbody = document.getElementById('tabela-produtos');
const btnAdicionar = document.getElementById('btnAdicionar');

async function carregarProdutos() {
  try {
    const res = await fetch(API);
    const produtos = await res.json();
    renderizar(produtos);
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
    alert("Erro ao conectar ao servidor de produtos.");
  }
}

function renderizar(produtos) {
  tbody.innerHTML = '';
  produtos.forEach(p => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.nome}</td>
      <td>R$ ${p.preco.toFixed(2).replace('.', ',')}</td>
      <td>${p.quantidade}</td>
      <td><img src="${p.imagem}" alt="${p.nome}"></td>
      <td>
        <button class="editar" data-id="${p.id}">Editar</button>
        <button class="excluir" data-id="${p.id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}


btnAdicionar.addEventListener('click', async () => {
  const nome = prompt("Nome:");
  const preco = parseFloat(prompt("Preço (ex: 29.90):").replace(',', '.'));
  const quantidade = parseInt(prompt("Quantidade:"), 10);
  const imagem = prompt("URL da imagem:");
  if (!nome || isNaN(preco) || isNaN(quantidade) || !imagem) {
    alert("Preencha corretamente.");
    return;
  }
  const novo = { nome, preco, quantidade, imagem };
  await fetch(API, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(novo) });
  carregarProdutos();
});

tbody.addEventListener('click', async (e) => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('excluir')) {
    if (!confirm("Confirma excluir?")) return;
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    carregarProdutos();
  } else if (e.target.classList.contains('editar')) {

    const res = await fetch(`${API}/${id}`);
    const produto = await res.json();
    const nome = prompt("Nome:", produto.nome);
    const preco = parseFloat(prompt("Preço:", produto.preco).replace(',', '.'));
    const quantidade = parseInt(prompt("Quantidade:", produto.quantidade), 10);
    const imagem = prompt("Imagem URL:", produto.imagem);
    if (!nome || isNaN(preco) || isNaN(quantidade) || !imagem) {
      alert("Dados inválidos.");
      return;
    }
    const atualizado = { nome, preco, quantidade, imagem };
    await fetch(`${API}/${id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify(atualizado) });
    carregarProdutos();
  }
});

carregarProdutos();
