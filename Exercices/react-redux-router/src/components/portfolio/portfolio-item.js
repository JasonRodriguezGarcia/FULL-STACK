import React from "react";
import { Link } from "react-router-dom";
// this is a functional component, and simple function that allows us
// less functionality than a class function, it allows to:
// render content, pass data, images, info ...
export default function(props) { // props are like parameters

  const {id, description, thumb_image_url, logo } = props.item;
  return (
    // attending to props title and url came from outside (old version)
    // <div>
    //   <h3>{props.title}</h3> 
    //   <h4>{props.url}</h4>
    //   <Link to={`/portfolio/${props.slug}`}>Link</Link>
    // </div>

    // Data we will need:
    // - background image: thumb_image_url
    // - logo
    // - description: description
    // - id: id
    
    <div>
      <div>
        <img src={thumb_image_url} />
        <img scr={logo} />
        {description}
      </div>
      <Link to={`/portfolio/${id}`}>Link</Link>
    </div>
  );
}