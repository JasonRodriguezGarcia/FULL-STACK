// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import axios from "axios";


export default class Test extends Component {
    constructor() {
      super();
  
      this.state = {
        dataItems: [],
        totalCount: 0,
        isLoading: true,
        // apiUrl: "https://jasonrodriguez.devcamp.space/portfolio/portfolio_blogs",
        apiUrl: "http://127.0.0.1:5000/get_results",
        apiAction: "POST"
  
      };

      this.handleResults = this.handleResults.bind(this);
    }
    buildForm() {
        let formData = new FormData();
      
        formData.append("[query]", "select * from guide;");

        return formData;  
      }

    handleResults() {  //WORKING OK retrieving data selection
    // axios({
    //     method: this.state.apiAction,
    //     url: this.state.apiUrl,
    //     // data: this.buildForm(),
    //     data: this.buildForm(),
    //     withCredentials: false
    //     })
    axios
        .post("http://127.0.0.1:5000/get_results",
            {
            // query: `select * from guide where id=${id};`
            query: `select * from guide;`
            })
        .then(response => {

        this.setState({
            dataItems: response.data
        });
        console.log(response);
    // debugger;
        // to return something:
        return console.log("Retrieveing data OK");
        })
        .catch(error => {
            console.log("retrieving data error", error);
    });
}
    handleResults2() { // Trying updating data OK
        // axios({
        //     method: this.state.apiAction,
        //     url: this.state.apiUrl,
        //     // data: this.buildForm(),
        //     data: this.buildForm(),
        //     withCredentials: false
        //     })
        axios
            .post("http://127.0.0.1:5000/get_results",
                {
                query: `select * from guide where id=1;`
                // query: `select * from guide where id=${id};`
                // query: `UPDATE guide SET title="My first guide CHANGED" WHERE id=${id};`
            })
            .then(response => {
            this.setState({
                dataItems: response.data
            });
            console.log(response.data);
            alert(response.data[0]);
            // to return something:
            //   return console.log(response.data);
            return console.log("Retrieveing data OK");
            })
            .catch(error => {
                console.log("retrieving data error", error);
        });
    }

    componentDidMount(){
        this.handleResults();
    }
    handleDeleteClick(blog) {
        //  console.log("deleted ", blog);
        }
      
    render() {
        const dataRecords = this.state.dataItems.map(dataItem => {
            // return (<div key={dataItem.key}><h3>{dataItem.content} - {dataItem.title}</h3>
            return (<div key={dataItem[0]}><h3>{dataItem[0]} {dataItem[1]} - {dataItem[2]}</h3>
                </div>)
        });
    
        return (
            <div className='container'>
                <p>RULANDO ...</p>
                {dataRecords}
            </div>    
        )
    }
}
