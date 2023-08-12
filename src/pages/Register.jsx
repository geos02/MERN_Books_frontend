import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import { useState } from 'react';

const Register = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async (e) => {

        //TODO: Validar
        e.preventDefault();

        if([nombre, email, password].includes('')) {
            setAlerta({
                msg : 'Todos los campos son obligatorios',
                type : 'danger'
            })

            setTimeout(() => {
              setAlerta({ msg : '' })
            } , 3000)

            return;
        }

        //TODO: POST a localhost:3000/api/1.0/auth/register
        try {
            const response = await fetch('http://localhost:3000/api/1.0/auth/register', {
              method : 'POST',
              headers : {
                "Content-type" : "application/json"
              },
              body : JSON.stringify({ nombre, email, password })
            })

            const data = await response.json();

            if(data.error) {
                setAlerta({
                    msg : data.error,
                    type : 'danger'
                })
            }

            if(data.data) {
                setAlerta({
                    msg : 'Usuario registrado correctamente',
                    type : 'success'
                })
            }
            
        } catch(error) {
            console.log(error);
        }

  }

  return (
    <div className="contenedor grid-center">
                <h2>Registrar Usuario</h2>
                <form className='formulario'>
                    <div className="campo">
                        <label htmlFor="usuario">Nombre</label>
                        <input type="text" placeholder='Nombre' onInput={(e) => setNombre(e.target.value)}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="usuario">Email</label>
                        <input type="text" placeholder='Usuario' onInput={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' onInput={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex space-between">
                        <input type="submit" className="btn btn-verde" value="Registrar" onClick={handleSubmit} />
                        <Link to={"/"}>Iniciar Sesión</Link>
                    </div>
                    { alerta.msg && <Alerta msg={alerta.msg} type={alerta.type}/>} 
                </form>
            </div>
  )
}

export default Register