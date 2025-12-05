document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');


  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    dados = carregarUsuarios();

    const usuario = dados.find(u => login === u.email && senha === u.senha);

  if (usuario) {
    alert('Login realizado com sucesso!');
    sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuario));
    const usuarioCorrente = usuario;
    if(usuario.role === 'cliente'){
    window.location.href = 'index.html';
    }
    else if(usuario.role === 'funcionario'){
      window.location.href = 'estoque.html';
    }
    else if(usuario.role === 'adm'){
      window.location.href = 'adm.html';
    }
  } else {
    alert('Usuário ou senha incorretos!');
  }


    /*dados.forEach(usuario => {
    if (
      dados &&
      login === usuario.email &&
      senha === usuario.senha
    ) {
      alert('Login realizado com sucesso!');
      const usuarioCorrente = usuario;
      sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuario));
      window.location.href = 'index.html'; 
      return;
    } else {
      alert('Usuário ou senha incorretos!');
    }
    });*/
 

  });
});

    function carregarUsuarios() {
      try {
        const raw = localStorage.getItem('usuarios');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }

      const switchBtn = document.getElementById("toggleDarkMode");

  if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
    switchBtn.checked = true;
  }

  switchBtn.addEventListener("change", () => {
    if (switchBtn.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("tema", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("tema", "light");
    }
  });

