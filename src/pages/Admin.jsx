import { useEffect, useState } from "react"
import { useNavigate, Link } from 'react-router-dom'

import AdminHeader from "../components/AdminHeader";

const Admin = () => {

  const [libros, setLibros] = useState();
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  function handleFavorito(e) {
      console.log(e.currentTarget.dataset.id);
      e.currentTarget.classList.toggle('favorito');
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
          <AdminHeader />

          <main className="contenedor">
              <h2 className="header">Catálogo de Libros</h2>
              <Link className="btn" to={'nuevo'}>Agrega un nuevo libro +</Link>
              <div className="catalogo">

                    { cargando && libros.map((libro, index) => (
                        <div key={index} className="libro">
                        <div className="imagen-libro">
                          <img src={`/img/${libro.imagen}`} alt="libro" />
                        </div>
                        <div className="libro-datos">
                          <svg className="icono icono-like" data-id={`${libro._id}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Me Gusta</title><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z"></path></svg>
                          <svg className="icono icono-fav" data-id={`${libro._id}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" onClick={handleFavorito}><title>Favorito</title><path d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z" ></path></svg>
                          <svg className="icono icono-like" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><title>Ver Reseña</title><path d="M6.012 18H21V4a2 2 0 0 0-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1zM8 6h9v2H8V6z"></path></svg>
                        </div>
                    </div> 
                    ))}

              </div>
          </main>
      </>
  )
}

export default Admin