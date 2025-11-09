// Script autossuficiente para o formulário de cadastro
// Seleciona o formulário e campos
const form = document.getElementById('cadastroForm');
const nomeEl = document.getElementById('nome');
const emailEl = document.getElementById('email');
const senhaEl = document.getElementById('senha');
const telefoneEl = document.getElementById('telefone');
const dataNascEl = document.getElementById('dataNasc');
const termosEl = document.getElementById('termos');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function carregarUsuarios() {
    try {
        const raw = localStorage.getItem('usuarios');
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function salvarUsuarios(arr) {
    localStorage.setItem('usuarios', JSON.stringify(arr));
}

function emailExistente(email) {
    const usuarios = carregarUsuarios();
    return usuarios.some(u => String(u.email).toLowerCase() === String(email).toLowerCase());
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = nomeEl.value.trim();
    const email = emailEl.value.trim();
    const senha = senhaEl.value;
    const telefone = telefoneEl.value.trim();
    const dataNasc = dataNascEl ? dataNascEl.value : '';
    const termos = termosEl ? termosEl.checked : false;

    // Validações básicas
    if (!nome) { alert('Informe seu nome.'); nomeEl.focus(); return; }
    if (!email || !emailRegex.test(email)) { alert('Informe um e-mail válido.'); emailEl.focus(); return; }
    if (!senha || senha.length < 8) { alert('A senha deve ter pelo menos 8 caracteres.'); senhaEl.focus(); return; }
    if (!termos) { alert('Você precisa aceitar os termos.'); termosEl.focus(); return; }

    if (emailExistente(email)) { alert('Este e-mail já está cadastrado.'); emailEl.focus(); return; }

    const usuario = {
        id: crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
        nome,
        email,
        senha,
        telefone,
        dataNasc,
        criadoEm: new Date().toISOString()
    };

    const usuarios = carregarUsuarios();
    usuarios.push(usuario);
    salvarUsuarios(usuarios);

    form.reset();
    alert('Cadastro realizado com sucesso!');
    // Redireciona para o painel do administrador
    window.location.href = 'adimi.html';
});
