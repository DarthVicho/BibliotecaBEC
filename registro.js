//Función principal que maneja el registro de sesión
function RegsitroSesion() {
    // Obtenemos los valores de los campos
    const nombre = document.getElementById('nombre').value.trim();
    const rut = document.getElementById('rut').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('pass').value.trim();

    // Obtenemos el elemento donde mostraremos los mensajes
    const mensajeElemento = document.getElementById('mensaje');

    // Si algún campo esta vacio nos muestra un mensaje de error
    if (!correo || !contrasena) {
    mensajeElemento.textContent = 'Por favor complete todos los campos.';
    mensajeElemento.style.color = 'red';
    return;
    }
}

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