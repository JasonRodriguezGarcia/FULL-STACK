import React, { Component } from "react";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
  constructor() {
    super();

    this.state = {
      pageTitle: "Welcome to my portfolio",
      data: [
        { title: "Quip" },
        { title: "Eventbrite" },
        { title: "Ministry Safe" },
        { title: "SwingAway" }
      ]
    };
    // IMPORTANT WARNING !!!
    // handlePageTitleUpdate needs to be tied and bound to "this" instance
    // of the component, so that it has access to all "this" data
    this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem title={item.title} url={"google.com"} />;
    });
  }

  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "Something Else"
    });
  }

render() {
    return (
      <div>
        <h2>{this.state.pageTitle}</h2>

        {this.portfolioItems()}

        <hr />

        <button onClick={this.handlePageTitleUpdate}>Change Title</button>
      </div>
      /*  On upper line handlePageTitleUpdate has to be in blue due to it is one
          variable.
          Whenever you're building out items, such as click listeners, you have
          to be able to give that click listener or that function that you're 
          passing it to, you need to connect it directly into the component, 
          and whenever you have a custom function, then you need to be able to 
          be a little more explicit with it.
          So you need to say, "this has access to the 'this' keyword, to the data
          inside of the component even when it is inside of a click listener."
          That, I know, is confusing, but that is what the key difference is. 
          Whenever you have a click listener or any type of event listener or 
          anything like that, you need to bind that function directly into the
          component, and that is what we're doing right there. */
    );
  }
}