
const Libro = () => {

    return(
        
        <div className="libro">
            <img className="imagen-libro" src="/img/legiones.jpg" alt="libro" />
            <div className="libro-datos">
                <img className="icono" src="/img/me-gusta.png" alt="icono me gusta" />
                <img className="icono" src="/img/favorito.png" alt="icono favorito" />
            </div>
        </div> 
    )
}

export default Libro;