// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import './bootstrap-min.css';
import ListWorkers from "./pages/workers/list-workers";
import CreateEditWorker from "./pages/workers/create-edit-worker";
import EditWorker from "./pages/workers/edit-worker";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            // workerEditMode: false
            // workerListUpdated: false
        // blogItems: [],
        // totalCount: 0,
    //     isLoading: true,
        };
    }


    render() {
        return (
        //     <div className='container'>
        //         <Workers />
        //     </div>
        <div className="vh-100 gradient-custom">
            <div className="container">
            {/* <h3>{this.state.workerListUpdated}</h3> */}
            <h1 className="page-header text-center">Workers CRUD </h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ListWorkers />}
                    />
                    <Route path="/addnewworker" element={<CreateEditWorker workerEditMode = {false}/>}
                    />
                    {/* <Route path="/get_user" element={<CreateWorker workerEditMode = {true}/>} /> */}
                    <Route path="/user/:id/edit" element={<CreateEditWorker workerEditMode = {true}/>} />
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

