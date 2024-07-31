// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
 

export default class CreateWorker extends Component {
    constructor() {
        super();
 
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
            newId: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState ({
            [event.target.name]: [event.target.value]
        });
    }


    componentWillUnmount() {
        console.log(this.state.newId);
        // TODO
        //  - SEND EMAIL using this.state.newId
        //  - CLOSE COMPONENT
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
            // const test = response.data;
            console.log(response.data);
            console.log("Data created OK");
        })
        .catch(error => {
            console.log("Data creation error");
            // return console.log("retrieving data error");
        });
        event.preventDefault();

        // this.props.history.push('/');
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
                                <input type="text" className="form-control" name="nombre" placeholder="Nombre" onChange={this.handleChange} />
                                {/* </div>
                                <div className="mb-3">
                                <label>Apellidos</label> */}
                                <input type="text" className="form-control" name="apellidos" placeholder="Apellidos" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Fecha Nacimiento</label>
                            <input type="text" className="form-control" name="fecha_nacimiento" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>NIF/NIE</label>
                            <input type="text" className="form-control" name="doi" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Municipio</label>
                            <input type="text" className="form-control" name="id_municipio" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Codigo Postal</label>
                            <input type="text" className="form-control" name="codigo_postal" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Provincia</label>
                            <input type="text" className="form-control" name="id_provincia" onChange={this.handleChange} />
                            </div>
                            {/* <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange} />
                            </div>    */}
                            <button type="submit" name="add" className="btn btn-primary">Save</button>
                        </form>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
        );
    }
}
