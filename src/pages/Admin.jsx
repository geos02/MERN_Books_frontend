import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

const Admin = () => {

  const [libros, setLibros] = useState();
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  function cerrarSesion() {
      localStorage.removeItem('token');
      window.location.reload();
  }

  useEffect(() => {

      const getBooks = async () => {

          const token = localStorage.getItem('token');

          if(!token) {
            navigate('/');
            return;
          }

          try {
            
            const response = await fetch('http://localhost:3000/api/1.0/books', {
              headers : {
                "Content-type" : "application/json",
                "Authorization" : `Bearer ${token}` 
              }
            });

            const { data } = await response.json();
            setLibros(data);
            setCargando(true);
            
          } catch(error) {
            console.log(error);
          }

      }

      getBooks();

  },[]);

  return (
      <>
          <header className="admin-header">
              <h1>Sistema gestor de Libros</h1>
              <nav className="admin-nav">
                  <a href="#">Perfil</a>
                  <a href="#">Favoritos</a>
                  <a href="#">Pendientes</a>
                  <a href="" onClick={cerrarSesion}>Cerrar Sesión</a>
              </nav>
          </header>

          <main className="contenedor">
              <h2 className="header">Catálogo de Libros</h2>
              <div className="catalogo">

                    { cargando && libros.map((libro, index) => (
                        <div key={index} className="libro">
                        <img className="imagen-libro" src={`/img/${libro.imagen}`} alt="libro" />
                        <div className="libro-datos">
                            <img className="icono" src="/img/me-gusta.png" alt="icono me gusta" />
                            <img className="icono" src="/img/favorito.png" alt="icono favorito" />
                        </div>
                    </div> 
                    ))}

              </div>
          </main>
      </>
  )
}

export default Admin