import React from "react";

// this is a functional component, and simple function that allows us
// less functionality than a class function, it allows to:
// render content, pass data, images, info ... ONLY ONE DIV COULD BE RETURNED!!
export default function(props) { // props are like parameters
  return (
    <div>
      <h2>Portfolio detail for {props.match.params.slug}</h2>
    </div>
  );
}