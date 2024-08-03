// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import WorkerItem from "./worker-item";

export default class ListWorkers extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        workerItems: [],
        totalCount: 0,
        isLoading: true,
        apiUrl: "http://127.0.0.1:5000/get_listworkers",
        apiAction: "POST",
      };

      this.handleListWorkers = this.handleListWorkers.bind(this);
      this.handleUpdateListWorkers = this.handleUpdateListWorkers.bind(this);
    }

handleUpdateListWorkers(id) {
    this.setState({
        workerItems: this.state.workerItems.filter(item => {
          return item.id !== id;
        })
      });
}

buildForm() {
    let formData = new FormData();
    formData.append("[query]", "select * from trabajadores;");
    return formData;  
}

handleListWorkers() {  //WORKING OK retrieving data selection
    // debugger;
    axios({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: {
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
        console.log("Retrieving data Ok");
    })
    .catch(error => {
        console.log("retrieving data error");
    });
}

componentDidMount(){
    this.handleListWorkers();
}

   
render() {
    const dataRecords = this.state.workerItems.map(workerItem => {
        return <WorkerItem key={workerItem.id} 
                workerItem={workerItem} handleUpdateListWorkers = {this.handleUpdateListWorkers} />
    });

        return (
            <div>
                <div className="container h-100">
                    <div className="row h-100">
                        <div className="col-12">
                            <p><Link to="/addnewworker" className="btn btn-success">Add New User</Link> </p>
                            <h1>List Workers</h1>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th scope='col'>#</th>
                                        <th scope='col'>Nombre y Apellidos</th>
                                        {/* <th scope='col'>Nombre</th>
                                        <th scope='col'>Apellidos</th> */}
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
