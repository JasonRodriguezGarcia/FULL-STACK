import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import withRouter from '../../hooks/withRouter'; // mooded withRouter hook to work in Class NOT IN USE FINALLY
 
// BE CARE OF END LINE CLASS CREATEWORKER COMPONENT
// TUNNED withRouter - NOT NOW, CHANGED
export default class CreateWorker extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            apiUrl: "http://127.0.0.1:5000/addnewworker",
            apiAction: "POST",
            nombre: "",
            apellidos: "",
            fecha_nacimiento: "",
            doi: "",
            id_municipio: 0,
            codigo_postal: 0,
            id_provincia: 0,
            newId: [],
            fieldDisabled: false,
            submitButtonEnabled: true,
            editedId: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFieldsDisabled = this.handleFieldsDisabled.bind(this);
        this.getListWorker = this.getListWorker.bind(this);
    }

    getListWorker () {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            data: {
                // query: `select * from guide where id=1;`
                // query: `select * from guide where id=${id};`
                // query: `UPDATE guide SET title="My first guide CHANGED" WHERE id=${id};`
                query: `select * from trabajadores WHERE trabajadores_id_trabajador=${this.state.editedId};`
            },
            withCredentials: false
        })
        .then(response => {
            this.setState({
                workerItems: response.data
            });
            console.log(response.data);
            console.log("Retrieving getListWorkers data Ok");
        })
        .catch(error => {
            console.log("retrieving getListWorkersdata error");
        });
    
    }
    handleFieldsDisabled() {
        this.setState ({
                fieldDisabled: true
        })
    }
    handleChange(event) {
        this.setState ({
            [event.target.name]: [event.target.value]
        });
    }

    componentWillUnmount() {
        console.log(this.state.newId);
        alert("mandar sms");
        // TODO
        //  - SEND EMAIL using this.state.newId
    }

    componentDidMount () {
        alert("entro en didmount");
        if (this.props.workerEditMode) {
            alert("edit mode ON");
            // this.getListWorker();
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
            this.setState({
                newId: response.data
            });
            // console.log(response.data);
            console.log("Data created OK");
        })
        .catch(error => {
            return console.log("Data creation error");
        });
        this.setState ({
            fieldDisabled: true,
            submitButtonEnabled: false
        })
        // const { navigate } = this.props;
        // navigate("/");
    }

    render() {
        
        return (
            <div>
                <div className="container h-100">
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                        <h1>Create user</h1>
                        <form onSubmit={this.handleSubmit}>
                            <div className="mb-3">
                                <label>Nombre y Apellidos</label>
                                <input type="text" className="form-control" name="nombre" disabled={this.state.fieldDisabled} placeholder="Nombre" onChange={this.handleChange} />
                                {/* </div>
                                <div className="mb-3">
                                <label>Apellidos</label> */}
                                <input type="text" className="form-control" name="apellidos" disabled={this.state.fieldDisabled} placeholder="Apellidos" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Fecha Nacimiento</label>
                            <input type="text" className="form-control" name="fecha_nacimiento" disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>NIF/NIE</label>
                            <input type="text" className="form-control" name="doi" disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Municipio</label>
                            <input type="text" className="form-control" name="id_municipio" disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Codigo Postal</label>
                            <input type="text" className="form-control" name="codigo_postal" disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Provincia</label>
                            <input type="text" className="form-control" name="id_provincia" disabled={this.state.fieldDisabled} onChange={this.handleChange} />
                            </div>
                            {/* <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange} />
                            </div>    */}
                            {this.state.submitButtonEnabled // Action Text
                                ?   <button type="submit" name="add" className="btn btn-primary">Save</button>
                                :   (<div>
                                        <Link to="/" className="btn btn-success">Back to main</Link>
                                        <div>DATOS ALMACENADOS</div>
                                    </div>)}
                        </form>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}
// export default withRouter(CreateWorker);
// export default CreateWorker;