import { useState } from "react";
import { useNavigate, Link  } from 'react-router-dom';
import Alerta from '../components/Alerta';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const navigate = useNavigate();

    function handleSubmit(e) {

        e.preventDefault();

        if([email, password].includes('')) {

            setAlerta({
                msg : 'Todos los campos son obligatorios',
                type : 'danger'
            })

            setTimeout(() => {
                setAlerta({ msg : '' })
            }, 3000)

            return;
        }
       
        login()
    }

    async function login() {

            const response = await fetch('http://localhost:3000/api/1.0/auth/login', {
    
                method : 'POST',
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({ email , password })
            });

            const data = await response.json();
            localStorage.setItem('token', data.token);

            if(data.error) {

                setAlerta({
                    msg : data.error,
                    type : 'danger'
                })

                setTimeout(() => {
                    setAlerta({ msg : '' })
                }, 3000)

                return;
            }
            
            //TODO: Redirigir a la página de admin
            if(data.token) {
                navigate('/admin');
            }

        
    }

    return(
        <>
            <div className="contenedor grid-center">
                <h2>Base de datos Libros</h2>
                <form className='formulario'>
                    <div className="campo">
                        <label htmlFor="usuario">Email</label>
                        <input type="text" placeholder='Usuario' onInput={(e) => setEmail(e.target.value)}/>
                    </div>

                    <div className="campo">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Password' onInput={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex space-between">
                        <input type="submit" className="btn btn-verde" value="Login" onClick={handleSubmit} />
                        <Link to={"/register"}>Registrate</Link>
                    </div>
                    { alerta.msg && <Alerta msg={alerta.msg} type={alerta.type}/>} 
                </form>
            </div>
        </>
    )
}

export default Login;