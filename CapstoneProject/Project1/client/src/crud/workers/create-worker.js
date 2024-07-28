// import React, {useState, useEffect} from 'react'
// import { useNavigate } from "react-router-dom";
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

export default class CreateWorker extends Component {
    constructor() {
        super();
        // const navigate = useNavigate();
  
        // const [inputs, setInputs] = useState([]);
 
        this.state = {
            inputs: [],
            setInputs: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState ({
            [event.target.name]: [event.target.value]
        });
    }

    handleSubmit() {
        axios.post('http://127.0.0.1:5000/useradd', this.state.inputs).then(function(response){
            console.log(response.data);
            this.props.history.push("/");
        });              

    }
    render() {
        const handleSubmit = (event) => {
        }
     
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
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Apellidos</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Fecha Nacimiento</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>NIF/NIE</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Municipio</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            <div className="mb-3">
                            <label>Codigo Postal</label>
                            <input type="text" className="form-control" name="name" onChange={this.handleChange} />
                            </div>
                            {/* <div className="mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange} />
                            </div>   
                            <button type="submit" name="add" className="btn btn-primary">Save</button> */}
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
