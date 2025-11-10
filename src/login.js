document.querySelectorAll('.login-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const arrow = this.querySelector('.arrow');
        const entrarContainer = this.parentElement.querySelector('.entrar-container');
        const isOpen = entrarContainer.style.display === 'block';

        document.querySelectorAll('.entrar-container').forEach(cont => cont.style.display = 'none');
        document.querySelectorAll('.arrow').forEach(a => a.classList.remove('down'));

        if (!isOpen) {
            entrarContainer.style.display = 'block';
            arrow.classList.add('down');
        } else {
            entrarContainer.style.display = 'none';
            arrow.classList.remove('down');
        }
    });
});

    function CargaInicialAdm(){
        const usuario = {
            id: crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
            nome: 'adm inicial',
            email: 'adm00@gmail.com',
            senha: 'adm12345',
            telefone: '00000000',
            dataNasc: 2025,
            role: 'adm',
            criadoEm: 0
    }
    dados = carregarUsuarios();
    const aux = dados.find(u => usuario.email === u.email && usuario.senha === u.senha);
    if (aux){
        return;
    }
    else{
        dados.push(usuario);
        
    }

    

    salvarUsuarios(dados);

}


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
CargaInicialAdm();