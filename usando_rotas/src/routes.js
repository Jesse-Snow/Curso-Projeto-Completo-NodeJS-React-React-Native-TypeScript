import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Home from './pages/Home'; // Se usar index, não precisa colocar aqui
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';

function RouteApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/sobre' element={<Sobre/>} />
                <Route path='/contato' element={<Contato />} />
            </Routes>        
        </ BrowserRouter>
    )
}

export default RouteApp;