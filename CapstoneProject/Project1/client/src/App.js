// import React, {useState, useEffect} from 'react'
import React, { Component } from "react";
import axios from "axios";
import Test from "./test";

export default class App extends Component {
    constructor() {
      super();
  
      this.state = {
        blogItems: [],
        totalCount: 0,
        isLoading: true,
      };
    }
    render() {
        return (
            <div className='container'>
                <Test />
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

