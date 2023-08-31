
function cerrarSesion() {
    localStorage.removeItem('token');
    window.location.reload();
}


export { cerrarSesion }