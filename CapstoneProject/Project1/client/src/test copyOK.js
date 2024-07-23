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
        apiUrl: "http://127.0.0.1:5000/guides",
        apiAction: "GET"
  
      };

      this.handleResults = this.handleResults.bind(this);
    }

    handleResults() {
        axios({
            method: this.state.apiAction,
            url: this.state.apiUrl,
            // data: this.buildForm(),
             withCredentials: false
            })
            .then(response => {
                this.setState({
                    dataItems: response.data
                });
                console.log(response.data);
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
            return (<div key={dataItem.key}><h3>{dataItem.content} - {dataItem.title}</h3>
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
