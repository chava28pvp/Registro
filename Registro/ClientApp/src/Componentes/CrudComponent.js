import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CrudComponent = () => {
    const [registros, setRegistros] = useState([]);
    const [registroActual, setRegistroActual] = useState({ maquina: '', horaInicio: '', horaFin: '', seleccionarPieza: '', meta: '', buenas: '', malas: '' });
    const [modoEdicion, setModoEdicion] = useState(false);
    const [contadorId, setContadorId] = useState(1); // Iniciar el contador en 1
    const [tiempoCicloReal, setTiempoCicloReal] = useState(340);
    const [tiempoCicloEstimado, setTiempoCicloEstimado] = useState(400);

    const handleInputChange = (e) => {
        setRegistroActual({ ...registroActual, [e.target.name]: e.target.value });
    };

    const agregarRegistro = () => {
        if (
            registroActual.maquina.trim() !== '' &&
            registroActual.horaInicio.trim() !== '' &&
            registroActual.horaFin.trim() !== '' &&
            registroActual.seleccionarPieza.trim() !== '' &&
            registroActual.meta.trim() !== '' &&
            registroActual.buenas.trim() !== '' &&
            registroActual.malas.trim() !== '' &&
            registroActual.tiempoCicloReal.trim() !== '' &&
            registroActual.tiempoCicloEstimado.trim() !== ''
        ) {
            const nuevoRegistro = { ...registroActual, id: contadorId }; // Asignar el ID al nuevo registro
            setRegistros([...registros, nuevoRegistro]);
            setRegistroActual({
                maquina: '',
                horaInicio: '',
                horaFin: '',
                seleccionarPieza: '',
                meta: '',
                buenas: '',
                malas: '',
                tiempoCicloReal: '',
                tiempoCicloEstimado: ''
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
        setRegistroActual({ maquina: '', horaInicio: '', horaFin: '', seleccionarPieza: '', meta: '', buenas: '', malas: '' });
        // Actualizar los indicadores de tiempo
        setTiempoCicloReal(registroActual.tiempoCicloReal);
        setTiempoCicloEstimado(registroActual.tiempoCicloEstimado);
    };
    const calcularDisponibilidad = () => {
        const tiempoOperacionRealTotal = registros.reduce((total, registro) => total + parseInt(registro.tiempoCicloReal), 0);
        const tiempoDisponibleTotal = registros.length * tiempoCicloEstimado; // Suponiendo que el tiempo estimado es el mismo para todos los registros
        return (tiempoOperacionRealTotal / tiempoDisponibleTotal) * 100;
    };
    
    const calcularRendimiento = () => {
        const produccionRealTotal = registros.reduce((total, registro) => total + parseInt(registro.buenas), 0);
        const produccionEstándarTotal = registros.reduce((total, registro) => total + parseInt(registro.meta), 0);
        return (produccionRealTotal / produccionEstándarTotal) * 100;
    };
    
    const calcularCalidad = () => {
        const produccionBuenaTotal = registros.reduce((total, registro) => total + parseInt(registro.buenas), 0);
        const produccionTotalTotal = registros.reduce((total, registro) => total + parseInt(registro.buenas) + parseInt(registro.malas), 0);
        return (produccionBuenaTotal / produccionTotalTotal) * 100;
    };
    
    const calcularOEE = () => {
        return calcularDisponibilidad() * calcularRendimiento() * calcularCalidad() / 10000;
    };
    const cardsData = [
        { title: 'Disponibilidad', text: calcularDisponibilidad().toFixed(2) + '%' },
        { title: 'Rendimiento', text: calcularRendimiento().toFixed(2) + '%' },
        { title: 'Calidad', text: calcularCalidad().toFixed(2) + '%' },
        { title: 'OEE', text: calcularOEE().toFixed(2) + '%' }
    ];

    const renderCards = () => {
        return cardsData.map((card, index) => (
            <div key={index} className="card text-white bg-success mb-3" style={{ maxWidth: '18rem' }}>
               
                <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.text}</p>
                </div>
            </div>
        ));
    };
    

    return (
        <div className="container mt-5">
            <h2>Factory Information</h2>
            <div className="mb-3">
                <select className="form-control mt-2" name="maquina" value={registroActual.maquina} onChange={handleInputChange}>
                    <option value="">Maquina / Op</option>
                    <option value="Ford">Op 20</option>
                    <option value="Chevrolet">Op 50</option>
                    <option value="Honda">Op 100</option>
                    <option value="Nissan">OKK 1</option>
                </select>
                <p></p>
                <div className="d-flex">
                    <input type="time" className="form-control me-2" name="horaInicio" value={registroActual.horaInicio} onChange={handleInputChange} />
                    <input type="time" className="form-control" name="horaFin" value={registroActual.horaFin} onChange={handleInputChange} />
                </div>
                <select className="form-control mt-2" name="seleccionarPieza" value={registroActual.seleccionarPieza} onChange={handleInputChange}>
                    <option value="">Seleccione la Pieza</option>
                    <option value="Ford">Ford - F1000</option>
                    <option value="Chevrolet">GM - 4SMQ</option>
                    <option value="Honda">Rotax - 16U0</option>
                    <option value="Nissan">Stellantis - S100TF</option>
                </select>
                <input type="text" className="form-control mt-2" placeholder="Meta" name="meta" value={registroActual.meta} onChange={handleInputChange} />
                <input type="text" className="form-control mt-2" placeholder="Buenas" name="buenas" value={registroActual.buenas} onChange={handleInputChange} />
                <input type="text" className="form-control mt-2" placeholder="Malas" name="malas" value={registroActual.malas} onChange={handleInputChange} />
                <input type="text" className="form-control mt-2" placeholder="Tiempo Ciclo Real" name="tiempoCicloReal" value={registroActual.tiempoCicloReal} onChange={handleInputChange} />
<input type="text" className="form-control mt-2" placeholder="Tiempo Disponible" name="tiempoCicloEstimado" value={registroActual.tiempoCicloEstimado} onChange={handleInputChange} />

            </div>
            <div className="mb-3">
                {modoEdicion ? (
                    <button onClick={actualizarRegistro} className="btn btn-warning">Actualizar</button>
                ) : (
                    <button onClick={agregarRegistro} className="btn btn-primary">Insertar</button>
                )}
            </div>
           

                <div className="d-flex justify-content-between">
                {renderCards()}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Maquina</th>
                        <th>Hora Inicio</th>
                        <th>Hora Fin</th>
                        <th>Pieza</th>
                        <th>Meta</th>
                        <th>Buenas</th>
                        <th>Malas</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {registros.map(registro => (
                        <tr key={registro.id}>
                            <td>{registro.id}</td>
                            <td>{registro.maquina}</td>
                            <td>{registro.horaInicio}</td>
                            <td>{registro.horaFin}</td>
                            <td>{registro.seleccionarPieza}</td>
                            <td>{registro.meta}</td>
                            <td>{registro.buenas}</td>
                            <td>{registro.malas}</td>
                          
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

export default CrudComponent;

