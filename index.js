//Función principal que maneja el inicio de sesión
function manejarInicioDeSesion() {
    //Obtenemos los valores del correo y contraseña
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('pass').value.trim();

    //Mostraremos los mensajes
    const mensajeElemento = document.getElementById('mensaje');

    //Si hay un campo esta vacio nos muestra un mensaje de error
    if (!correo || !contrasena) {
    mensajeElemento.textContent = 'Por favor complete todos los campos.';
    mensajeElemento.style.color = 'red';
    return;
    }

    //inicio de sesion
    //Normalizamos los correos para comparar
    const correoNormalizado = correo.toLowerCase();

    //Verificamos segun el correo ingresado

    //PARA LA SECCION DE USUARIOS
    //Si termina con @gmail.com
    if (correoNormalizado.endsWith('@gmail.com')) {
        //Redirecciona a el html de usuarios
        window.location.href = 'usuarios.html';
    }

    //Si termina con @hotmail.com
    else if(correoNormalizado.endsWith('@hotmail.com')){
        window.location.href = 'usuarios.html';
    }

    //PARA LA SECCION DE BIBLIOTECARIOS
    //Si termina en @bibliotecarios.bec
    else if (correoNormalizado.endsWith('@bibliotecarios.bec')) {
        //Redirecciona a el html de bibliotecarios
        window.location.href = 'bibliotecarios.html';
    }

    //PARA LA SECCION DE ADMINISTRATIVOS
    //Si termina en @administrativos.bec
    else if (correoNormalizado.endsWith('@administrativos.bec')) {
        //Redirecciona al html de administrativos
        window.location.href = 'administrativos.html';
    }

    //Si el correo no coincide con ninguno de los tipos
    else {
        mensajeElemento.textContent = 'Correo o contraseña incorrectos.';
        mensajeElemento.style.color = 'red';
        }
}
//Para ejecutar la función cuando se haga clic en ingresar
document.addEventListener('DOMContentLoaded', () => {
    const botonInicioSesion = document.getElementById('iniciarSesionBtn');
    if (botonInicioSesion) {
        botonInicioSesion.addEventListener('click', (event) => {
            event.preventDefault(); // Evitamos que el formulario se envíe de forma predeterminada
            manejarInicioDeSesion();
        });
    }
});

//Mostrar y ocultar contraseña con el ojo
const pass = document.getElementById('pass')
    icon = document.querySelector('.bx')
    
icon.addEventListener('click', e => {
    if (pass.type === 'password'){
        pass.type = 'text'
        icon.classList.remove('bx-show-alt');
        icon.classList.add('bx-hide');
    }else{
        pass.type = 'password';
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show-alt');
    }
})