import React from "react";

// this is a functional component, and simple function that allows us
// less functionality than a class function, it allows to:
// render content, pass data, images, info ...
export default function(props) { // props are like parameters
  return (
    // attending to props title and url came from outside
    <div>
      <h3>{props.title}</h3> 
      <h4>{props.url}</h4>
    </div>
  );
}