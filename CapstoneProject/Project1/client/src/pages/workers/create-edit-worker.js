import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class NOT IN USE FINALLY
import CreateEditWorkerItem from './create-edit-worker-item';
 
// BE CARE OF END LINE CLASS CREATEWORKER COMPONENT
// TUNNED withRouter to allow using Router parameters
class CreateEditWorker extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: "http://127.0.0.1:5000/addnewworker",
            apiAction: "POST",
            newId: [],
            // editedId: this.props.match.params.slug, <-- it ONLY WORKS IN ROUTER V.5
            editedId: this.props.params.id,
            workerItem: {},
        };
        this.getWorkerItem = this.getWorkerItem.bind(this);
        this.clearWorkerItem = this.clearWorkerItem.bind(this);
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
        console.log("tras el axios al editar")
        console.log(response.data);
        console.log(this.state.workerItem);
        console.log("Retrieving getWorkerItem data Ok");
    })
    .catch(error => {
        console.log("retrieving getWorkerItem error");
    });
}

clearWorkerItem() {
    this.setState ({
        workerItem: {}
    });
}

// componentDidUpdate() {
//     if (Object.keys(this.state.workerItem).lenght > 0) {
//         const {
//             id,
//             nombre,
//             apellidos,
//             fecha_nacimiento,
//             doi,
//             id_municipio,
//             codigo_postal,
//             id_provincia,
//             id_vehiculo,
//             telefono_contacto,
//             correo_electronico,
//             id_situacion,
//             lopd
//             }  = this.state.workerItem;

//         this.setState({
//             id: id,
//             nombre: nombre,
//             apellidos: apellidos,
//             fecha_nacimiento: fecha_nacimiento,
//             doi: doi,
//             id_municipio: id_municipio,
//             codigo_postal: codigo_postal,
//             id_provincia: id_provincia,
//             id_vehiculo: id_vehiculo,
//             telefono_contacto: telefono_contacto,
//             correo_electronico: correo_electronico,
//             id_situacion: id_situacion,
//             lopd
//         });
//     }
// }

componentWillUnmount() {
    console.log(this.state.newId);
    // alert("mandar sms");
    // TODO
    //  - SEND EMAIL using this.state.newId
}

componentDidMount () {
    if (this.props.workerEditMode) {
        this.getWorkerItem();
    }
}
buildForm() {
    let formData = new FormData();
    formData.append("trabajadores[trabajadores_nombre]", this.state.nombre);
    formData.append("trabajadores[trabajadores_apellidos]", this.state.apellidos);
    formData.append("trabajadores[trabajadores_fecha_nacimiento]", this.state.fecha_nacimiento);
    formData.append("trabajadores[trabajadores_doi]", this.state.doi);
    formData.append("trabajadores[trabajadores_id_municipio]", this.state.id_municipio);
    formData.append("trabajadores[trabajadores_codigo_postal]", this.state.codigo_postal);
    formData.append("trabajadores[trabajadores_id_provincia]", this.state.id_provincia);
    
    // if (this.state.featured_image){
    //     formData.append("portfolio_blog[featured_image]",
    //         this.state.featured_image);
    // }
    return formData;  
}

    render() {
        console.log("imprimiendo workerItem en RENDER");
        console.log(this.state.workerItem);
        console.log(this.state.workerItem[0]);
        return (
            <CreateEditWorkerItem workerItem = {this.state.workerItem}
                workerEditMode = {this.props.workerEditMode}
                clearWorkerItem = {this.clearWorkerItem}
                editedId = {this.state.editedId}
            />
        );
    }
}
export default withRouter(CreateEditWorker);
