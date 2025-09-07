// Lógica para cerrar sesión
document.addEventListener('DOMContentLoaded', function() {
    const cerrarSesionBtn = document.getElementById('cerrarSesionBtn');

    if (cerrarSesionBtn) {
        cerrarSesionBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Detiene la acción predeterminada del link

            // Elimina el indicador de sesión del localStorage
            localStorage.removeItem('loggedIn');

            // Redirige al usuario a la página de inicio
            window.location.href = 'index.html';
        });
    }
});