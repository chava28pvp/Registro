import React from 'react';
import Login from './Componentes/Login.js';
import CrudComponent from './Componentes/CrudComponent.js';
import NavBar from './Componentes/NavBar.js';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

const AppWrapper = () => {
    const location = useLocation();

    return (
        <>
            {location.pathname !== "/" && <NavBar />}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/registro-vehiculo" element={<CrudComponent />} />
               
            </Routes>

        </>
    );

}

const App = () => {
    return (
        <Router>
            <AppWrapper />
        </Router>
    );
}

export default App;

