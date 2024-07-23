import React, {useState, useEffect} from 'react'

export default function App() {

  const [data,setData] = useState([{}])
  
  useEffect(()=> {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      ESTO ES UN COMIENZO !!!
      <br/>CONECTADO BACK-END CON FRONT-END!!!
      <br/>ya queda menos .... :_
      {(typeof data.members === "undefined") 
        ? (
          <p>No hay datos...</p>
        )
        : (
          data.members.map((member, i) => (
            <p key={i}>{member}</p>
          )
        )
      )}
    </div>
  )
}

