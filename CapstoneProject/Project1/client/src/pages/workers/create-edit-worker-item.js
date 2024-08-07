import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
 
export default class CreateEditWorkerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apiAction: "POST",
            apiUrl: "http://127.0.0.1:5000/addworker",
            id: 0,
            nombre: "",
            apellidos: "",
            fecha_nacimiento: "",
            doi: "",
            id_municipio: 0,
            codigo_postal: 0,
            id_provincia: 0,
            id_vehiculo: 0,
            telefono_contacto: "",
            correo_electronico: "",
            id_situacion: 0,
            lopd: "",
            headerText: ["Create User", "Edit User"],    
            fieldDisabled: false,
            submitButtonEnabled: true,
        };            

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldsDisabled = this.handleFieldsDisabled.bind(this);

    }

handleFieldsDisabled() {
    this.setState ({
            fieldDisabled: true
    });
}

handleChange(event) {
    this.setState ({
        [event.target.name]: [event.target.value]
    });
}

        
componentWillUnmount() {
    console.log(this.state.newId);
    // alert("mandar sms");
    // TODO
    //  - SEND EMAIL using this.state.newId
}

componentDidUpdate () {

    if (Object.keys(this.props.workerItem).length > 0) {
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
            }  = this.props.workerItem[0];
        
        this.props.clearWorkerItem();

        this.setState({
            id: id,
            nombre: nombre || "",
            apellidos: apellidos || "",
            fecha_nacimiento: fecha_nacimiento || "",
            doi: doi || "",
            id_municipio: id_municipio || 0,
            codigo_postal: codigo_postal || "",
            id_provincia: id_provincia  || 0,
            id_vehiculo: id_vehiculo || 0,
            telefono_contacto: telefono_contacto || "",
            correo_electronico: correo_electronico || "",
            id_situacion: id_situacion || 0,
            lopd: lopd || "N",
            apiUrl: `http://127.0.0.1:5000/editworker/${this.props.editedId}`,
        });
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

handleSubmit(event) {
    event.preventDefault();
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        withCredentials: false
    })
    .then(response => {
        console.log(this.props.workerEditMode);
        if (this.props.workerEditMode){
            console.log("Data modified OK");
        } else {
            this.setState({
                newId: response.data
            });
            console.log(response.data);
            console.log("Data created OK");
        }
    })
    .catch(error => {
        if (this.props.workerEditMode) {
            return console.log("Worker Data MODIFICATION error");
        } else {
            return console.log("Worder Data CREATION error");
        }
    });
    this.setState ({
        fieldDisabled: true,
        submitButtonEnabled: false
    });
    // const { navigate } = this.props;
    // navigate("/");
    // } else {
    //     alert("Guardando Registro EDITADO");
    // }
}
    
    render() {
        return (
            <div className="container h-100">
                <div className="row">
                    <div className="col-2"></div>
                        <div className="col-8">
                        <h1>{this.props.workerEditMode ? this.state.headerText[1]: this.state.headerText[0]}: {this.props.editedId}</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label>Nombre y Apellidos</label>
                                {/* <input type="text" className="form-control" name="nombre" disabled={this.state.fieldDisabled} placeholder="Nombre" onChange={this.handleChange} /> */}
                                <input type="text" className="form-control" name="nombre" value={this.state.nombre} disabled={this.state.fieldDisabled} placeholder="Nombre" onChange={this.handleChange} />
                                {/* </div>
                                <div className="mb-3">
                                <label>Apellidos</label> */}
                                <input type="text" className="form-control" name="apellidos" value={this.state.apellidos} disabled={this.state.fieldDisabled} placeholder="Apellidos" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Fecha Nacimiento</label>
                            <input type="text" className="form-control" name="fecha_nacimiento" value={this.state.fecha_nacimiento} disabled={this.state.fieldDisabled} placeholder="dd/mm/yyyy"onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>NIF/NIE</label>
                            <input type="text" className="form-control" name="doi" value={this.state.doi} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Municipio</label>
                            <input type="text" className="form-control" name="id_municipio" value={this.state.id_municipio} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Codigo Postal</label>
                            <input type="text" className="form-control" name="codigo_postal" value={this.state.codigo_postal} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Provincia</label>
                            <input type="text" className="form-control" name="id_provincia" value={this.state.id_provincia} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            {/* <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange} />
                            </div>    */}
                            {this.state.submitButtonEnabled // Action Text
                                ?   <button type="submit" name="add" className="btn btn-primary">Save</button>
                                :   (<div>
                                        <Link to="/" className="btn btn-success">Back to main</Link>
                                        <div>DATA SAVED</div>
                                    </div>)}
                        </form>
                    </div>
                    <div className="col-2"></div>
                </div>
            </div>
        );
    }
};
