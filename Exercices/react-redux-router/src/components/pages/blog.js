import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogItem from "../blog/blog-item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Blog extends Component {
  constructor() {
    super();

    this.state = {
      blogItems: [],
      totalCount: 0,
      currentPage: 0,
      isLoading: true
    };

    this.getBlogItems = this.getBlogItems.bind(this);
    this.onScroll = this.onScroll.bind(this);
    window.addEventListener("scroll", this.onScroll, false);

  }

  onScroll() {
    if (this.state.isLoading || this.state.blogItems.length ===
        this.state.totalCount) {
      return;
    }
    if (window.innerHeight + document.documentElement.scrollTop 
      === document.documentElement.offsetHeight) {
      this.getBlogItems();
    }
  }

  getBlogItems() {
    this.setState ({
      currentPage: this.state.currentPage + 1
    });
    axios
      .get(`https://jasonrodriguez.devcamp.space/portfolio`+
        `/portfolio_blogs/?page=${this.state.currentPage}`,
         { withCredentials : true})
      .then (response => {
//        console.log("respuesta then ****", response);
        this.setState ({
          blogItems: this.state.blogItems.concat(
            response.data.portfolio_blogs),
          totalCount: response.data.meta.total_records,
          isLoading: false
        })
      })
      .catch (error => {
        console.log("respuesta catch ****", error);
      });
  }

  componentWillMount() {
    this.getBlogItems();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  render() {
    const blogRecords = this.state.blogItems.map(blogItem=> {
      return <BlogItem key={blogItem.key} blogItem={blogItem} />
    });
    return ( // using same className styles used in blog-detail
      // and this will affec to to blogRecords Links indirectly
      <div className='blog-container'>
        <div className='content-container'>
          {blogRecords}
        </div>
        {this.state.isLoading ? (
          <div className="content-loader">
            <FontAwesomeIcon icon="spinner" spin />
          </div>) : null
        }
      </div>
    );
  }
}

export default Blog;