// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import './App.css';
import './bootstrap-min.css';
import CreateWorker from "./crud/workers/create-worker";


import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Workers from "./crud/workers/workers";

export default class App extends Component {
    constructor() {
      super();
  
    //   this.state = {
    //     blogItems: [],
    //     totalCount: 0,
    //     isLoading: true,
    //   };
    }
    render() {
        return (
        //     <div className='container'>
        //         <Workers />
        //     </div>
        <div className="vh-100 gradient-custom">
            <div className="container">
            <h1 className="page-header text-center">Workers CRUD</h1>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Workers />} />
                    <Route path="/addnewuser" element={<CreateWorker />} />
                    {/* <Route path="user/:id/edit" element={<EditUser />} /> */}
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

