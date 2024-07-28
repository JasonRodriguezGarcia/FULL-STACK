// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import WorkerItem from "./worker-item";

export default class Workers extends Component {
    constructor() {
      super();
  
      this.state = {
        workerItems: [],
        totalCount: 0,
        isLoading: true,
        // apiUrl: "https://jasonrodriguez.devcamp.space/portfolio/portfolio_blogs",
        apiUrl: "http://127.0.0.1:5000/get_results",
        apiAction: "POST",
        // title: "",
        // content: ""
      };

      this.handleResults = this.handleResults.bind(this);
    }

    buildForm() {
        let formData = new FormData();
      
        formData.append("[query]", "select * from trabajadores;");

        return formData;  
    }

    handleResults() {  //WORKING OK retrieving data selection
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
    }
    componentDidMount(){
        this.handleResults();
    }
    handleDeleteClick(blog) {
        //  console.log("deleted ", blog);
        }
      
    render() {
        const dataRecords = this.state.workerItems.map(workerItem => {
            return <WorkerItem key={workerItem.id} workerItem={workerItem} />
        });

        return (
            <div>
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12">
                            {/* <p><Link to="/addnewuser" className="btn btn-success">Add New User</Link> </p> */}
                            <p><Link to="/addnewuser" className="btn btn-success">Add New User</Link> </p>
                            <h1>List Workers</h1>
                            <table class="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Nombre</th>
                                        <th scope='col'>Apellidos</th>
                                        <th scope='col'>F.Nacimiento</th>
                                        <th scope='col'>DNI/NIE</th>
                                        <th scope='col'>Municipio</th>
                                        <th scope='col'>Codigo Postal</th>
                                        <th scope='col'>Provincia</th>
                                        <th scope='col'>Action</th>
                                        {/* <th>Date Added</th>
                                        <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataRecords}
                                    {/* {users.map((user, key) =>
                                        <tr key={key}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <Link to={`user/${user.id}/edit`} className="btn btn-success" style={{marginRight: "10px"}}>Edit</Link>
                                                <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    )} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
