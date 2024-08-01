// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './bootstrap-min.css';
import ListWorkers from "./pages/workers/list-workers";
import CreateWorker from "./pages/workers/create-worker";
import EditWorker from "./pages/workers/edit-worker";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            workerListUpdated: "false",
        // blogItems: [],
        // totalCount: 0,
    //     isLoading: true,
        };
        this.handleListUpdatedTrue = this.handleListUpdatedTrue.bind(this);
        this.handleListUpdatedFalse = this.handleListUpdatedFalse.bind(this);
    }

    handleListUpdatedTrue() {
        this.setState ({
            workerListUpdated : "true"
        })
    }

    handleListUpdatedFalse() {
        this.setState ({
            workerListUpdated : "false"
        })
    }

    render() {
        return (
        //     <div className='container'>
        //         <Workers />
        //     </div>
        <div className="vh-100 gradient-custom">
            <div className="container">
                <h2> {this.state.workerListUpdated}</h2>
            <h1 className="page-header text-center">Workers CRUD {this.state.workerListUpdated}</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListWorkers handleListUpdatedTrue={this.handleListUpdatedTrue}
                            handleListUpdatedFalse={this.handleListUpdatedFalse} workerListUpdated={this.state.workerListUpdated}
                    />} />

                    {/* <Route path="/" render={props => (
                        <ListWorkers {...props} handleListUpdatedTrue={this.handleListUpdatedTrue}
                            handleListUpdatedFalse={this.handleListUpdatedFalse} workerListUpdated={this.state.workerListUpdated} /> )}
                    /> */}
                    <Route path="/addnewworker" element={<CreateWorker handleListUpdatedTrue={this.handleListUpdatedTrue}
                            handleListUpdatedFalse={this.handleListUpdatedFalse}  workerListUpdated={this.state.workerListUpdated}
                    />} />

                    {/* <Route path="/addnewworker" render={props => (
                        <CreateWorker {...props} handleListUpdatedTrue={this.handleListUpdatedTrue}
                            handleListUpdatedFalse={this.handleListUpdatedFalse} workerListUpdated={this.state.workerListUpdated} />)}
                    /> */}
                    <Route path="user/:id/edit" element={<EditWorker />} />
                </Routes>
            </BrowserRouter>
            </div>
        </div>
    
        )
    
    }
}


// export default function App2() {

//   const [data,setData] = useState([{}])
  
//   useEffect(()=> {
//     fetch("/members").then(
//       res => res.json()
//     ).then(
//       data => {
//         setData(data)
//         console.log(data)
//       }
//     )
//   }, [])

//   return (
//     <div>
//       ESTO ES UN COMIENZO !!!
//       <br/>CONECTADO BACK-END CON FRONT-END!!!
//       <br/>ya queda menos .... :_
//       {(typeof data.members === "undefined") 
//         ? (
//           <p>No hay datos...</p>
//         )
//         : (
//           data.members.map((member, i) => (
//             <p key={i}>{member}</p>
//           )
//         )
//       )}
//     </div>
//   )
// }

