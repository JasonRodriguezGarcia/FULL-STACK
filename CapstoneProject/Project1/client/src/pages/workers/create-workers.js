// import React, {useState, useEffect} from 'react'
// import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

export default class CreateWorker extends Component {
    constructor() {
        super();
 
        this.state = {
            inputs: [],
            apiUrl: "http://127.0.0.1:5000/get_results",
            apiAction: "POST",
            nombre: "",
            apellidos: "",
            fecha_nacimiento: "",
            doi: "",
            id_municipio: 0,
            codigo_postal: 0,
            id_provincia: 0
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
}

handleChange(event) {
    this.setState ({
        [event.target.name]: [event.target.value]
    });
}

buildForm() {
    let formData = new FormData();
    formData.append("[trabajadores_nombre]", this.state.nombre);
    formData.append("[trabajadores_apellidos]", this.state.apellidos);
    formData.append("[trabajadores_fecha_nacimiento]", this.state.fecha_nacimiento);
    formData.append("[trabajadores_doi]", this.state.doi);
    formData.append("[trabajadores_id_municipio]", this.state.id_municipio);
    formData.append("[trabajadores_codigo_postal]", this.state.codigo_postal);
    formData.append("[trabajadores_id_provincia]", this.state.id_provincia);
    
    // if (this.state.featured_image){
    //     formData.append("portfolio_blog[featured_image]",
    //         this.state.featured_image);
    // }

    return formData;  
}
    
handleSubmit(event) {
    // axios.post('http://127.0.0.1:5000/useradd',
    //     this.state.inputs)
    //     .then(function(response){
    //         console.log(response.data);
    //         this.props.history.push("/");
    //     });              
    
    alert("por aqui");
    console.log(this.buildForm());
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        // data: this.buildForm(),
        data:                 {
            // query: `select * from guide where id=1;`
            // query: `select * from guide where id=${id};`
            // query: `UPDATE guide SET title="My first guide CHANGED" WHERE id=${id};`
            query: `select * from trabajadores;`
        },
        withCredentials: false
    })
    .then(response => {
        this.setState({
            workerItems: response.data 
        });
        console.log(response.data);
        return console.log("Retrieveing data OK");
    })
    .catch(error => {
        return console.log("retrieving data error");
    });
    event.preventDefault();
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
                        <label>Nombre</label>
                        <input type="text" className="form-control" name="nombre" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                        <label>Apellidos</label>
                        <input type="text" className="form-control" name="apellidos" onChange={this.handleChange} />
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



//     constructor() {
//       super();
  
//       this.state = {
//         workerItems: [],
//         totalCount: 0,
//         isLoading: true,
//         // apiUrl: "https://jasonrodriguez.devcamp.space/portfolio/portfolio_blogs",
//         apiUrl: "http://127.0.0.1:5000/get_results",
//         apiAction: "POST",
//         // title: "",
//         // content: ""
//       };

//       this.handleResults = this.handleResults.bind(this);
//     }

//     componentDidMount(){
//         // this.handleResults();
//     }

//     render() {


//         return ("hi");
//     }
