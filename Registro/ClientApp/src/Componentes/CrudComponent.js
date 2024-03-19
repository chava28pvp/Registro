import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


//CrudComponent
const CrudComponent = () => {
    const [vehiculos, setVehiculos] = useState([]);
    const [vehiculoActual, setVehiculoActual] = useState({ idVehiculo: '', marca: '', modelo: '', año: '', kilometraje: '' });
    const [modoEdicion, setModoEdicion] = useState(false);



    const handleInputChange = (e) => {
        setVehiculoActual({ ...vehiculoActual, [e.target.name]: e.target.value });
    };

    const agregarVehiculo = () => {
        setVehiculos([...vehiculos, vehiculoActual]);
        setVehiculoActual({ idVehiculo: '', marca: '', modelo: '', año: '', kilometraje: '', numeroCliente: '' });
    };

    const eliminarVehiculo = (id) => {
        setVehiculos(vehiculos.filter(vehiculo => vehiculo.idVehiculo !== id));
    };

    const editarVehiculo = (id) => {
        const vehiculoAEditar = vehiculos.find(vehiculo => vehiculo.idVehiculo === id);
        setVehiculoActual(vehiculoAEditar);
        setModoEdicion(true);
    };

    const actualizarVehiculo = () => {
        setVehiculos(vehiculos.map(vehiculo => (vehiculo.idVehiculo === vehiculoActual.idVehiculo ? vehiculoActual : vehiculo)));
        setModoEdicion(false);
        setVehiculoActual({ idVehiculo: '', marca: '', modelo: '', año: '', kilometraje: '', numeroCliente: '' });
    };

    return (
        <div className="container mt-5">
            <h2>Factory Information</h2>
            <div className="mb-3">

                <select className="form-control mt-2" name="maquina" value={vehiculoActual.maquina} onChange={handleInputChange}>
                    <option value="">Maquina / Op</option>
                    <option value="Ford">Op 20</option>
                    <option value="Chevrolet">Op 50</option>
                    <option value="Honda">Op 100</option>
                    <option value="Nissan">OKK 1</option>

                </select>
                <p></p>
                <input type="text" className="form-control" placeholder="Hora" name="idVehiculo" value={vehiculoActual.idVehiculo} onChange={handleInputChange} />
                <select className="form-control mt-2" name="marca" value={vehiculoActual.marca} onChange={handleInputChange}>
                    <option value="">Seleccione la Pieza</option>
                    <option value="Ford">Ford - F1000</option>
                    <option value="Chevrolet">GM - 4SMQ</option>
                    <option value="Honda">Rotax - 16U0</option>
                    <option value="Nissan">Stellantis - S100TF</option>
                   
                </select>
                <input type="text" className="form-control mt-2" placeholder="Meta" name="modelo" value={vehiculoActual.modelo} onChange={handleInputChange} />
                <input type="text" className="form-control mt-2" placeholder="Buenas" name="año" value={vehiculoActual.año} onChange={handleInputChange} />
                <input type="text" className="form-control mt-2" placeholder="Malas" name="kilometraje" value={vehiculoActual.kilometraje} onChange={handleInputChange} />
            </div>
            <div className="mb-3">
                {modoEdicion ? (
                    <button onClick={actualizarVehiculo} className="btn btn-warning">Actualizar</button>
                ) : (
                    <button onClick={agregarVehiculo} className="btn btn-primary">Insertar</button>
                )}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Año</th>
                        <th>Kilometraje</th>
                        <th>Cliente</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {vehiculos.map(vehiculo => (
                        <tr key={vehiculo.idVehiculo}>
                            <td>{vehiculo.idVehiculo}</td>
                            <td>{vehiculo.marca}</td>
                            <td>{vehiculo.modelo}</td>
                            <td>{vehiculo.año}</td>
                            <td>{vehiculo.kilometraje}</td>
                            <td>{vehiculo.numeroCliente}</td>
                            <td>
                                <button onClick={() => editarVehiculo(vehiculo.idVehiculo)} className="btn btn-sm btn-outline-secondary">Editar</button>
                                <button onClick={() => eliminarVehiculo(vehiculo.idVehiculo)} className="btn btn-sm btn-outline-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CrudComponent;
