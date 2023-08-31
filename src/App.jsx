import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Confirmar from './pages/Confirmar';
import AgregarLibro from './pages/AgregarLibro';

import './scss/App.scss';
import Favoritos from './pages/Favoritos';

function App() {

  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                    <Route index element={<Login/>}/>
                    <Route path='register' element={<Register/>}/>
                    <Route path='confirmar/:token' element={<Confirmar/>}/>
                </Route>

                {/* Rutas Protegidas */}
                <Route path='/admin'>
                    <Route index element={<Admin/>} />
                    <Route path='favoritos' element={<Favoritos/>} />
                    <Route path='nuevo' element={<AgregarLibro/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
