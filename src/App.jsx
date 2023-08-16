import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Confirmar from './pages/Confirmar';

import './scss/App.scss';

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
                </Route>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
