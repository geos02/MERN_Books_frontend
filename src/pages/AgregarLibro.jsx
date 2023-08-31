import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminHeader from "../components/AdminHeader";

import Alerta from "../components/Alerta";


const AgregarLibro = () => {

    //TODO: States
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [imagen, setImagen] = useState('');
    const [resena, setResena] = useState('');
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('autor', autor);
        formData.append('resena', resena);
        formData.append('imagen', imagen);
        
        const response = await fetch('http://localhost:3000/api/1.0/books/new', {
    
                method : 'POST',
                headers : {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}`
                },
                body : formData
            });

        const data = await response.json();

        setAlerta({
            msg : data.msg,
            type : 'success'
        })

        setTimeout(() => {
            setAlerta({})
        }, 3000)
    }

    useEffect(() => {

        //TODO: Comprobar que existe el token
        const token = localStorage.getItem('token');
  
            if(!token) {
              navigate('/');
              return;
        }        
    })

    return(
        <>
            <AdminHeader />

            <main>
                <h2 className="header">Agregar Nuevo Libro</h2>
                <form className="formulario contenedor" onSubmit={handleSubmit}>

                    <div className="campo">
                        <label htmlFor="titulo">Titulo</label>
                        <input type="text" placeholder='Titulo' onInput={(e) => setTitulo(e.target.value)}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Autor</label>
                        <input type="text" placeholder='Autor' onInput={(e) => setAutor(e.target.value)} />
                    </div>

                    <div className="campo">
                        <label htmlFor="imagen">Imagen</label>
                        <input type="file" onChange={(e) => setImagen(e.target.files[0])}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="texto">Reseña</label>
                        <textarea id="texto" onInput={(e) => setResena(e.target.value)}></textarea>
                    </div>

                    <div className="flex space-between">
                        <input type="submit" className="btn" value="Agregar"/>
                    </div>

                    { alerta.msg && <Alerta msg={alerta.msg} type={alerta.type}/>}
                </form>
            </main>
        </>
    )
}

export default AgregarLibro;