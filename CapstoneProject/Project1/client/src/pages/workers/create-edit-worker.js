import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class NOT IN USE FINALLY
import CreateEditWorkerItem from './create-edit-worker-item';
 
// BE CARE OF END LINE CLASS CREATEWORKER COMPONENT
// TUNNED withRouter - NOT NOW, CHANGED
class CreateEditWorker extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: "http://127.0.0.1:5000/addnewworker",
            apiAction: "POST",

            newId: [],
            fieldDisabled: false,
            submitButtonEnabled: true,
            // editedId: this.props.match.params.slug, <-- it ONLY WORKS IN ROUTER V.5
            editedId: this.props.params.id,
            workerItem: {},
            // headerText: ["Create User", "Edit User"]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldsDisabled = this.handleFieldsDisabled.bind(this);
        this.getWorkerItem = this.getWorkerItem.bind(this);
        this.setWorkerItem = this.setWorkerItem.bind(this);
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
        // this.setWorkerItem(response.data);
        console.log("tras usar setWorkeritem");
        console.log(this.state.workerItem);
        console.log("Retrieving getWorkerItem data Ok");
        // debugger;
    })
    .catch(error => {
        console.log("retrieving getWorkerItem error");
    });
}

setWorkerItem(data) {
    console.log("imprimiendo data");
    console.log(data);
    this.setState ({
        workerItem: [data],
        apiAction: "POST",
        // apiUrl: `http://127.0.0.1:5000/get_user`,
        apiUrl: `http://127.0.0.1:5000/user/${this.state.editedId}/edit`,
    });
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
        }  = this.state.workerItem;
    // this.setState ({
    //     workerItem: {}
    // });
    this.setState({
        id: id,
        nombre: nombre,
        apellidos: apellidos,
        fecha_nacimiento: fecha_nacimiento,
        doi: doi,
        id_municipio: id_municipio,
        codigo_postal: codigo_postal,
        id_provincia: id_provincia,
        id_vehiculo: id_vehiculo,
        telefono_contacto: telefono_contacto,
        correo_electronico: correo_electronico,
        id_situacion: id_situacion,
        lopd
    });
    console.log("imprimiendo workerItem tras actulizar states");
    console.log(this.state.workerItem);
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

clearWorkerItem() {
    this.setState ({
        workerItem: {}
    });
}
componentDidUpdate() {
    if (Object.keys(this.state.workerItem).lenght > 0) {
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
            }  = this.state.workerItem;
        // this.setState ({
        //     workerItem: {}
        // });
        this.setState({
            id: id,
            nombre: nombre,
            apellidos: apellidos,
            fecha_nacimiento: fecha_nacimiento,
            doi: doi,
            id_municipio: id_municipio,
            codigo_postal: codigo_postal,
            id_provincia: id_provincia,
            id_vehiculo: id_vehiculo,
            telefono_contacto: telefono_contacto,
            correo_electronico: correo_electronico,
            id_situacion: id_situacion,
            lopd
        });
    }
}

componentWillUnmount() {
    console.log(this.state.newId);
    // alert("mandar sms");
    // TODO
    //  - SEND EMAIL using this.state.newId
}

componentDidMount () {
    if (this.props.workerEditMode) {
        this.getWorkerItem();
        // cambiar to updaterUser API
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
    // alert(this.props.workerEditMode);
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        withCredentials: false
    })
    .then(response => {
        console.log(this.props.workerEditMode);
        if (this.props.workerEditMode){
            alert("grabar registro");
        } else {
            this.setState({
                newId: response.data
            });
            // console.log(response.data);
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
        console.log("imprimiendo workerItem en RENDER");
        console.log(this.state.workerItem);
        console.log(this.state.workerItem[0]);
        return (
            <CreateEditWorkerItem workerItem = {this.state.workerItem}
                workerEditMode = {this.props.workerEditMode}
                clearWorkerItem = {this.clearWorkerItem}
                editedId = {this.state.editedId}
            />
            // <div>
            //     <div className="container h-100">
            //         <div className="row">
            //             <div className="col-2"></div>
            //             <div className="col-8">
            //             <h1>{this.props.workerEditMode ? this.state.headerText[1]: this.state.headerText[0]}</h1>
            //             <form onSubmit={this.handleSubmit}>
            //                 <div className="mb-3">
            //                     <label>Nombre y Apellidos</label>
            //                     <input type="text" className="form-control" name="nombre" value={this.state.name} disabled={this.state.fieldDisabled} placeholder="Nombre" onChange={this.handleChange} />
            //                     <input type="text" className="form-control" name="apellidos" value={this.state.apellidos} disabled={this.state.fieldDisabled} placeholder="Apellidos" onChange={this.handleChange} />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label>Fecha Nacimiento</label>
            //                 <input type="text" className="form-control" name="fecha_nacimiento" value={this.state.fecha_nacimiento} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label>NIF/NIE</label>
            //                 <input type="text" className="form-control" name="doi" value={this.state.doi} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label>Municipio</label>
            //                 <input type="text" className="form-control" name="id_municipio" value={this.state.id_municipio} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label>Codigo Postal</label>
            //                 <input type="text" className="form-control" name="codigo_postal" value={this.state.codigo_postal} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
            //                 </div>
            //                 <div className="mb-3">
            //                 <label>Provincia</label>
            //                 <input type="text" className="form-control" name="id_provincia" value={this.state.id_provincia} disabled={this.state.fieldDisabled} onChange={this.handleChange} />
            //                 </div>
            //                 {this.state.submitButtonEnabled // Action Text
            //                     ?   <button type="submit" name="add" className="btn btn-primary">Save</button>
            //                     :   (<div>
            //                             <Link to="/" className="btn btn-success">Back to main</Link>
            //                             <div>DATOS ALMACENADOS</div>
            //                         </div>)}
            //             </form>
            //             </div>
            //             <div className="col-2"></div>
            //         </div>
            //     </div>
            // </div>
        );
    }
}
export default withRouter(CreateEditWorker);
