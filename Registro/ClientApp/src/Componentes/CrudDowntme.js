import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CrudDowntime = () => {
    const [registros, setRegistros] = useState([]);
    const [registroActual, setRegistroActual] = useState({ horaInicio: '', horaFin: '', tiempoMuerto: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [contadorId, setContadorId] = useState(1); // Iniciar el contador en 1

    const handleInputChange = (e) => {
        setRegistroActual({ ...registroActual, [e.target.name]: e.target.value });
    };

    const agregarRegistro = () => {
        if (
            registroActual.horaInicio.trim() !== '' &&
            registroActual.horaFin.trim() !== '' &&
            registroActual.tiempoMuerto.trim() !== ''
        ) {
            const nuevoRegistro = { ...registroActual, id: contadorId }; // Asignar el ID al nuevo registro
            setRegistros([...registros, nuevoRegistro]);
            setRegistroActual({
                horaInicio: '',
                horaFin: '',
                tiempoMuerto: ''
            });
            setContadorId(contadorId + 1); // Incrementar el contador de ID
        } else {
            alert('Por favor completa todos los campos antes de agregar el registro.');
        }
    };

    const eliminarRegistro = (id) => {
        setRegistros(registros.filter(registro => registro.id !== id));
    };

    const editarRegistro = (id) => {
        const registroAEditar = registros.find(registro => registro.id === id);
        setRegistroActual(registroAEditar);
        setModoEdicion(true);
    };

    const actualizarRegistro = () => {
        setRegistros(registros.map(registro => (registro.id === registroActual.id ? registroActual : registro)));
        setModoEdicion(false);
        setRegistroActual({ horaInicio: '', horaFin: '', tiempoMuerto: '' });
    };

    return (
        <div className="container mt-5">
            <h2>DOWN TIME</h2>
            <div className="mb-3">
                <div className="d-flex">
                    <input type="time" className="form-control me-2" name="horaInicio" value={registroActual.horaInicio} onChange={handleInputChange} />
                    <input type="time" className="form-control" name="horaFin" value={registroActual.horaFin} onChange={handleInputChange} />
                </div>
                <input type="text" className="form-control mt-2" placeholder="Motivo" name="tiempoMuerto" value={registroActual.tiempoMuerto} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                {modoEdicion ? (
                    <button onClick={actualizarRegistro} className="btn btn-warning">Actualizar</button>
                ) : (
                    <button onClick={agregarRegistro} className="btn btn-primary">Insertar</button>
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Tiempo Muerto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map(registro => (
                        <tr key={registro.id}>
                            <td>{registro.id}</td>
                            <td>{registro.horaInicio}</td>
                            <td>{registro.horaFin}</td>
                            <td>{registro.tiempoMuerto}</td>
                            <td>
                                <button onClick={() => editarRegistro(registro.id)} className="btn btn-sm btn-outline-secondary">Editar</button>
                                <button onClick={() => eliminarRegistro(registro.id)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CrudDowntime;
