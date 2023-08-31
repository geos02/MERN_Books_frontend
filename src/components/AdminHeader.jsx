import { Link } from "react-router-dom";
import { cerrarSesion } from "../helpers/funciones.js";


const AdminHeader = () => {

    return(

        <header className="admin-header">
              <h1>Sistema gestor de Libros</h1>
              <nav className="admin-nav">
                  <Link to={'/admin'}>Perfil</Link>
                  <Link to={'/admin/favoritos'}>Favoritos</Link>
                  <a href="#">Pendientes</a>
                  <a href="" onClick={cerrarSesion}>Cerrar Sesión</a>
              </nav>
        </header>
    )
}

export default AdminHeader;