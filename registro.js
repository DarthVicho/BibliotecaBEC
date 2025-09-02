// La función principal que maneja el inicio de sesión
function manejarInicioDeSesion() {
    // Obtenemos los valores del correo electrónico y la contraseña
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

  // Obtenemos el elemento donde mostraremos los mensajes
    const mensajeElemento = document.getElementById('mensaje');

  // Si algún campo está vacío, mostramos un error
    if (!correo || !contrasena) {
    mensajeElemento.textContent = 'Por favor, completa todos los campos.';
    mensajeElemento.style.color = 'red';
    return;
    }


const ojito = document.querySelector('#contrasena')
const mostrar = document.querySelector('#mostrar')
mostrar.addEventListener('click',()=>{
    if (mostrar.checked){
        ojito.type = 'text'    
    }
    else {
        ojito.type = 'password'
    }
})
}