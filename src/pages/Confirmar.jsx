import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Confirmar = () => {

    const [mensaje, setMensaje] = useState('');
    const [tipoMensaje, setTipoMensaje] = useState('');
    const {token} = useParams();

    useEffect( () => {

        const fetchData = async () => {

            const response = await fetch(`http://localhost:3000/api/1.0/users/confirmar/${token}`);
            const data = await response.json();
            setMensaje(data.msg);
            setTipoMensaje(data.type);
        }

        fetchData();

    }, []);


    return (
        <div className="contenedor">
            <div className="mensaje-confirmar">
                <p>{mensaje}</p>
                { tipoMensaje === 'succes' && <Link to={'/'}>Inicia Sesion</Link> }
            </div>
        </div>
    )
}

export default Confirmar;