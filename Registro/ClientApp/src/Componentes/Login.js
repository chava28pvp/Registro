import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './Estilos.css';
import usersRoles from './log.json'; // Importa el archivo JSON correctamente

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        // Verifica que usersRoles.exclude sea un array antes de llamar a find
        if (Array.isArray(usersRoles.exclude)) {
            const user = usersRoles.exclude.find(user => user.username === username && user.password === password);
            if (user) {
                localStorage.setItem('userRole', user.role);
                if (user.role === 'Admin') {
                    navigate('/registro-vehiculo'); // Usa navigate en lugar de history.push
                }
            } else {
                setError('Invalid credential');
            }
        } else {
            setError('Invalid user roles data');
        }
    }

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="login-form p-4 shadow-sm">
                <h2 className="text-center mb-4">TANDRE</h2>
                <h1 className="text-center mb-4">Login</h1>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>

    );
}
export default Login;
