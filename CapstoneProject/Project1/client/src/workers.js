// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
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
        title: "",
        content: ""
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

    // handleResults2() { // Trying updating data OK
    //     // axios({
    //     //     method: this.state.apiAction,
    //     //     url: this.state.apiUrl,
    //     //     // data: this.buildForm(),
    //     //     data: this.buildForm(),
    //     //     withCredentials: false
    //     //     })
    //     axios
    //         .post("http://127.0.0.1:5000/get_results",
    //             {
    //             query: `select * from guide where id=1;`
    //             // query: `select * from guide where id=${id};`
    //             // query: `UPDATE guide SET title="My first guide CHANGED" WHERE id=${id};`
    //         })
    //         .then(response => {
    //         this.setState({
    //             guideItems: response.data
    //         });
    //         console.log(response.data);
    //         alert(response.data[0]);
    //         // to return something:
    //         //   return console.log(response.data);
    //     0    return console.log("Retrieveing data OK");
    //         })
    //         .catch(error => {
    //             console.log("retrieving data error", error);
    //     });
    // }

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
            <div className='container'>
                <p>RULANDO otra vez final..</p>
                {dataRecords}
            </div>    
        )
    }
}
