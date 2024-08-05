import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class NOT IN USE FINALLY
import CreateWorkerItem from './create-worker-item';
 
// BE CARE OF END LINE CLASS CREATEWORKER COMPONENT
// TUNNED withRouter - NOT NOW, CHANGED
class CreateWorker extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            newId: [],
            // editedId: this.props.match.params.slug, <-- it ONLY WORKS IN ROUTER V.5
            editedId: this.props.params.id,
            workerItem: {},
        };

        this.getWorkerItem = this.getWorkerItem.bind(this);
        this.setWorkerItem = this.setWorkerItem.bind(this);
    }

getWorkerItem () {
    axios({
        method: "POST",
        url: `http://127.0.0.1:5000/user/${this.state.editedId}/edit`,
        data: {
            // query: `select * from guide where id=1;`
            // query: `select * from guide where id=${id};`
            // query: `UPDATE guide SET title="My first guide CHANGED" WHERE id=${id};`
            query: `SELECT * FROM trabajadores WHERE trabajadores_id_trabajador=${this.state.editedId};`
        },
        withCredentials: false
    })
    .then(response => {
        // this.setState({
        //     workerItem: response.data
        // });
        this.setState ({
            workerItem: response.data,
            apiAction: "POST",
            // apiUrl: `http://127.0.0.1:5000/get_user`,
            apiUrl: `http://127.0.0.1:5000/user/${this.state.editedId}/edit`,
        });
        console.log("Tras el axios al editar")
        console.log(response.data);
        // this.setWorkerItem(response.data);
        console.log("tras usar setWorkerItem");
        console.log(this.state.workerItem);
        console.log("Retrieving getWorkerItem data Ok");
        // debugger;
    })
    .catch(error => {
        console.log("Retrieving getWorkerItem error");
    });
}

setWorkerItem(data) {
    console.log("imprimiendo data");
    console.log(data);
    this.setState ({
        workerItem: data,
        apiAction: "POST",
        // apiUrl: `http://127.0.0.1:5000/get_user`,
        apiUrl: `http://127.0.0.1:5000/user/${this.state.editedId}/edit`,
    });
    // const {
    //     id,
    //     nombre,
    //     apellidos,
    //     fecha_nacimiento,
    //     doi,
    //     id_municipio,
    //     codigo_postal,
    //     id_provincia,
    //     id_vehiculo,
    //     telefono_contacto,
    //     correo_electronico,
    //     id_situacion,
    //     lopd
    //     }  = this.state.workerItem;
    // this.setState ({
    //     workerItem: {}
    // });
    // // this.setState({
    // //     id: id,
    // //     nombre: nombre,
    // //     apellidos: apellidos,
    // //     fecha_nacimiento: fecha_nacimiento,
    // //     doi: doi,
    // //     id_municipio: id_municipio,
    // //     codigo_postal: codigo_postal,
    // //     id_provincia: id_provincia,
    // //     id_vehiculo: id_vehiculo,
    // //     telefono_contacto: telefono_contacto,
    // //     correo_electronico: correo_electronico,
    // //     id_situacion: id_situacion,
    // //     lopd
    // // });
    // console.log("imprimiendo workerItem tras actulizar states");
    // console.log(this.state.workerItem);
}

componentDidMount () {
    if (this.props.workerEditMode) {
        this.getWorkerItem();
        // cambiar to updaterUser API
    }
}
    
    render() {
        console.log("imprimiendo workerItem en RENDER");
        console.log(this.state.workerItem);
        debugger;
        return (
            <CreateWorkerItem workerItem = {this.state.workerItem}
                workerEditMode = {this.props.workerEditMode}
                editedId = {this.state.editedId}
             />

        );
    }
}
export default withRouter(CreateWorker);
// export default CreateWorker;