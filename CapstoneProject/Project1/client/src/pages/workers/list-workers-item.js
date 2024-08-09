import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const ListWorkersItem = props => {
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
            url: `http://127.0.0.1:5000/deleteworker/${id}`,
            withCredentials: false
            })
            .then(response => {
                console.log(response.data);
                props.handleUpdateListWorkers(id);

            })
            .catch(error => {
                console.log("Error Deleting");
            });
        return
    }

    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{nombre} {apellidos}</td>
            <td>{fecha_nacimiento}</td>
            <td>{doi}</td>
            <td>{id_municipio}</td>
            <td>{codigo_postal}</td>
            <td>{id_provincia}</td>
            <td>
                {/* <Link to={`/get_user`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link> */}
                <Link to={`/editworker/${id}`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                <button onClick={() => deleteUser(id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    )
}
  
export default ListWorkersItem;
