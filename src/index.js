const administrador = JSON.parse(localStorage.getItem('administrador'));
const usuarioCorrente =  JSON.parse(sessionStorage.getItem('usuarioCorrente'));

console.log('usuario adm?' + usuarioCorrente.role)

function apagaUsuarioCorrente(){
    JSON.parse(sessionStorage.setItem('usuarioCorrente', null));
}

if (usuarioCorrente.role === 'adm'){ 
    const isLogado = true;
    console.log(isLogado);
    let visualLogin = '';
    visualLogin = `<a style="text-decoration: none;" onclick="apagaUsuarioCorrente()" href="index.html" class="btn-login">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    let visualPerfil = '';
    visualPerfil = `<a style="text-decoration: none;" class="btn btn-adm" href="adm.html">Administração</a>`

    document.getElementById("liPerfil").innerHTML = visualPerfil;

        let visualEstoque = '';
    visualEstoque = `<a style="text-decoration: none;" class="btn btn-estoque" href="estoque.html">Estoque</a></a>`

    document.getElementById("liEstoque").innerHTML = visualEstoque;

  

};

if (usuarioCorrente.role === 'funcionario'){ 
    const isLogado = true;
    console.log(isLogado);
    let visualLogin = '';
    visualLogin = `<a onclick="apagaUsuarioCorrente()" href="index.html" class="btn-login">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    let visualEstoque = '';
    visualEstoque = `<a style="text-decoration: none;" class="btn btn-estoque" href="estoque.html">Estoque</a></a>`

    document.getElementById("liEstoque").innerHTML = visualEstoque;

          



        

};

if (usuarioCorrente.role === 'cliente'){ 
    const isLogado = true;
    console.log(isLogado);
    let visualLogin = '';
    visualLogin = `<a onclick="apagaUsuarioCorrente()" href="index.html" class="btn-login">Logout</a>`

    document.getElementById("liLogin").innerHTML = visualLogin;

    //let visualPerfil = '';
    //visualPerfil = `<a href="perfil.html">Sua Página</a>`

   // document.getElementById("liPerfil").innerHTML = visualPerfil;

          
console.log('teste user')


        

};  

function carregarUsuarios() {
      try {
        const raw = localStorage.getItem('usuarios');
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    }