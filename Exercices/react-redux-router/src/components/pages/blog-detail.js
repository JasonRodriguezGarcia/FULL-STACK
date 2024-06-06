import React, { Component } from 'react';
import axios from "axios";

{/* The slug "prop" from the route is passed to 
 BlogDetail but it isn't explicity specified, but
 slug is used here, that's why for props, to allow using it*/}
export default class BlogDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.match.params.slug,
      blogItem: {}
    };
  }

  getBlogItem() {
    axios
      .get(`https://jasonrodriguez.devcamp.space/`+
        `portfolio/portfolio_blogs/${this.state.currentId}`)
      .then(response => {
//        console.log("getBlogItem", response);
        this.setState ({
          blogItem: response.data.portfolio_blog
        })
      })
      .catch(error => {
        console.log("getBlogItem ERROr", error);
      })
  }
// when the component has been loaded run this
  componentDidMount() {
    this.getBlogItem();
  }
  render() {
//    console.log("currentId", this.state.currentId);
    const {
      title,
      content,
      featured_image_url,
      blog_status

    } = this.state.blogItem;
    return (
      <div className='blog-container'>
        <div className='content-container'>
          <h1>{title}</h1>
          <div className='featured-image-wrapper'>
            <img src={featured_image_url} />
          </div>
          <div className='content'>{content}</div>
        </div>
      </div>
    )
  }
}
