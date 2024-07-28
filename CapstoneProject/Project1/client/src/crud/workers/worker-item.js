import React from 'react';
// import { Link } from "react-router-dom";
// import striptags from 'striptags';
// import Truncate from 'react-truncate';

const WorkerItem = props => {
    const {
        id,
        nombre,
        apellidos,
        fecha_nacimiento,
        doi,
        id_municipio,
        codigo_postal,
        id_provincia,
        id_vehiculo,
        telefono_contacto,
        correo_electronico,
        id_situacion,
        lopd
     } = props.workerItem;

    const deleteUser = (id) => {
        // axios.delete(`http://127.0.0.1:5000/userdelete/${id}`).then(function(response){
        //     console.log(response.data);
        //     getUsers();
        // });
        alert(`Usuario ${id} borrado`);
        return
    }
    return (
    // <div>
        <tr key={id}>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{apellidos}</td>
            <td>{fecha_nacimiento}</td>
            <td>{doi}</td>
            <td>{id_municipio}</td>
            <td>{codigo_postal}</td>
            <td>{id_provincia}</td>
            <td>
                {/* <Link to={`user/${id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link> */}
                <button onClick={() => deleteUser(id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
        // {/* <p>{id} {nombre} {apellidos} {fecha_nacimiento} {doi} {id_municipio} {codigo_postal} {id_provincia}
        //     {id_vehiculo} {telefono_contacto} {correo_electronico} {id_situacion} {lopd}
        // </p> */}
    // </div>
    );
};
  
export default WorkerItem;
