import React from 'react';
// import { Link } from "react-router-dom";
// import striptags from 'striptags';
// import Truncate from 'react-truncate';

const WorkerItem = props => {
    const {
        id,
        nombre,
        apellidos,
     } = props.workerItem;
    return (
    <div>
        {/* <Link to={`/b/${id}`}> */}
        <p>{id} {nombre} {apellidos}</p>
        {/* </Link> */}
        {/* <div>
        <Truncate lines={5} // configuring
            ellipsis={        // Truncate
            <span>
                ... <Link to={`/b/${id}`}>Read more ...</Link>
            </span>
        }> {striptags(content)} </Truncate>
        </div>  */}
    </div>
    );
};
  
export default WorkerItem;
