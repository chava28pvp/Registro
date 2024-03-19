// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavBar = () => {
    const userRole = localStorage.getItem('userRole');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* ... */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {userRole === 'Admin' && (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/registro-vehiculo">Registro de Produccion</Link>
                            </li>
                           
                        </>
                    )}
                    {/* El enlace de reporte es accesible para todos los roles, incluido el regularUser */}
                   
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;