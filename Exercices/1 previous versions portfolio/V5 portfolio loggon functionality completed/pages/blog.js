import React from "react";
import { Link } from "react-router-dom";

// this is a functional component, and simple function that allows us
// less functionality than a class function, it allows to:
// render content, pass data, images, info ... ONLY ONE DIV COULD BE RETURNED!!
export default function() { // props are like parameters
  return (
    <div>
      <h2>Blog</h2>
      <div>
          <Link to="/about">Read more about myself</Link>
      </div>
    </div>
  );
}