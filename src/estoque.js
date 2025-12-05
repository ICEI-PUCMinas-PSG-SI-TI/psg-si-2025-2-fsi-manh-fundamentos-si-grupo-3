// --- CONFIGURAÇÃO ---
const STORAGE_KEY = "produtos";
const tbody = document.getElementById('tabela-produtos');
const btnAdicionar = document.getElementById('btnAdicionar');

// --- FUNÇÕES DE "API LOCAL" (simulam o JSON Server) ---
function getProdutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function setProdutos(produtos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

function getProdutoById(id) {
  const produtos = getProdutos();
  return produtos.find(p => p.id === id);
}

function addProduto(produto) {
  const produtos = getProdutos();
  produto.id = Date.now(); // gera ID único
  produtos.push(produto);
  setProdutos(produtos);
}

function updateProduto(id, atualizado) {
  const produtos = getProdutos();
  const index = produtos.findIndex(p => p.id === id);
  if (index !== -1) {
    produtos[index] = { ...produtos[index], ...atualizado };
    setProdutos(produtos);
  }
}
 const switchBtn = document.getElementById("toggleDarkMode");

  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
    if (switchBtn) switchBtn.checked = true;
  }

  if (switchBtn) {
    switchBtn.addEventListener("change", () => {
      if (switchBtn.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("tema", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("tema", "light");
      }
    });
  }

function deleteProduto(id) {
  const produtos = getProdutos().filter(p => p.id !== id);
  setProdutos(produtos);
}

// --- FUNÇÃO PRINCIPAL ---
async function carregarProdutos() {
  try {
    const produtos = getProdutos();
    renderizar(produtos);
  } catch (err) {
    console.error("Erro ao carregar produtos:", err);
    alert("Erro ao carregar produtos do armazenamento local.");
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
      <td><img src="${p.imagem}" alt="${p.nome}" style="max-width:60px"></td>
      <td>
        <button class="editar" data-id="${p.id}">Editar</button>
        <button class="excluir" data-id="${p.id}">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// --- ADICIONAR PRODUTO ---
btnAdicionar.addEventListener('click', () => {
  const nome = prompt("Nome:");
  const preco = parseFloat(prompt("Preço (ex: 29.90):").replace(',', '.'));
  const quantidade = parseInt(prompt("Quantidade:"), 10);
  const imagem = prompt("URL da imagem:");
  if (!nome || isNaN(preco) || isNaN(quantidade) || !imagem) {
    alert("Preencha corretamente.");
    return;
  }
  const novo = { nome, preco, quantidade, imagem };
  addProduto(novo);
  carregarProdutos();
});

// --- EDITAR / EXCLUIR PRODUTO ---
tbody.addEventListener('click', (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains('excluir')) {
    if (!confirm("Confirma excluir?")) return;
    deleteProduto(id);
    carregarProdutos();
  } else if (e.target.classList.contains('editar')) {
    const produto = getProdutoById(id);
    if (!produto) return alert("Produto não encontrado.");

    const nome = prompt("Nome:", produto.nome);
    const preco = parseFloat(prompt("Preço:", produto.preco).replace(',', '.'));
    const quantidade = parseInt(prompt("Quantidade:", produto.quantidade), 10);
    const imagem = prompt("Imagem URL:", produto.imagem);
    if (!nome || isNaN(preco) || isNaN(quantidade) || !imagem) {
      alert("Dados inválidos.");
      return;
    }
    updateProduto(id, { nome, preco, quantidade, imagem });
    carregarProdutos();
  }
});

// --- BUSCA E FILTRO ---
const inputBusca = document.getElementById('search');
const btnRecarregar = document.getElementById('btnRecarregar');

// Função que filtra produtos pelo texto digitado
function filtrarProdutos() {
  const termo = inputBusca.value.trim().toLowerCase();
  const produtos = getProdutos();

  if (termo === '') {
    renderizar(produtos);
    return;
  }

  const filtrados = produtos.filter(p =>
    p.nome.toLowerCase().includes(termo) ||
    (p.imagem && p.imagem.toLowerCase().includes(termo)) ||
      p.nome.toLowerCase().includes(termo) ||
  p.quantidade.toString().includes(termo) ||
  p.preco.toString().includes(termo)
  );

  renderizar(filtrados);
}

// Atualiza a tabela conforme o usuário digita
inputBusca.addEventListener('input', filtrarProdutos);

// Botão “Recarregar” limpa a busca e recarrega tudo
btnRecarregar.addEventListener('click', () => {
  inputBusca.value = '';
  carregarProdutos();
});


// --- INICIALIZAÇÃO ---
carregarProdutos();