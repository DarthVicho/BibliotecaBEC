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

    //inicio de sesion
    // Normalizamos el correo para la comparación
    const correoNormalizado = correo.toLowerCase();

    //verificamos segun el correo
    //si termina con @gmail.com
    if (correoNormalizado.endsWith('@gmail.com')) {
        //redirecciona a el html de usuarios
        window.location.href = 'usuarios.html';
    }

    //si termina en @bibliotecarios.com
    else if (correoNormalizado.endsWith('@bibliotecarios.bec')) {
        //redirecciona a el html de bibliotecarios
        window.location.href = 'bibliotecarios.html';
    }

    //si termina en @administrativos.bec
    else if (correoNormalizado.endsWith('@administrativos.bec')) {
        //redirecciona al html de administrativos
        window.location.href = 'administrativos.html';
    }

    // Si el correo no coincide con ningún tipo conocido
    else {
        mensajeElemento.textContent = 'Correo o contraseña incorrectos.';
        mensajeElemento.style.color = 'red';
        }
}

//mostrar contraseña
const contra = document.querySelector('#contrasena')
const mostrar = document.querySelector('#mostrar')
mostrar.addEventListener('click',()=>{
    if (mostrar.checked){
        contra.type = 'text';    
    }else {
        contra.type = 'password';
    }
})

// Agregamos un "escuchador de eventos" al botón de inicio de sesión
// para que se ejecute la función cuando se haga clic
document.addEventListener('DOMContentLoaded', () => {
    const botonInicioSesion = document.getElementById('iniciarSesionBtn');
    if (botonInicioSesion) {
        botonInicioSesion.addEventListener('click', (event) => {
            event.preventDefault(); // Evitamos que el formulario se envíe de forma predeterminada
            manejarInicioDeSesion();
        });
    }
});