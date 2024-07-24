import React from 'react';
// import { Link } from "react-router-dom";
// import striptags from 'striptags';
// import Truncate from 'react-truncate';

const GuideItem = props => {
    const {
        id,
        title,
        content,
     } = props.guideItem;
    return (
    <div>
        {/* <Link to={`/b/${id}`}> */}
        <p>{id} {title} {content}</p>
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
  
export default GuideItem;
