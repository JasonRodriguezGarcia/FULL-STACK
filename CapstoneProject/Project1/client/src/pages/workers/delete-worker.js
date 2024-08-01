import React from 'react';
import axios from 'axios';
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
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1:5000/workerdelete/${id}`
        })
            // .delete(`http://127.0.0.1:5000/workerdelete/${id}`)
            .then(response => {
                console.log(response.data);
                alert(`Usuario - ${id} borrado`);
            })
            .error(error => {
                console.log("Error Deleting");
            });
    }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{nombre} {apellidos}</td>
            {/* <td>{nombre}</td>
            <td>{apellidos}</td> */}
            <td>{fecha_nacimiento}</td>
            <td>{doi}</td>
            <td>{id_municipio}</td>
            <td>{codigo_postal}</td>
            <td>{id_provincia}</td>
            <td>
                <Link to={`user/${id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                <button onClick={() => deleteUser(id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
}
  
export default WorkerItem;
