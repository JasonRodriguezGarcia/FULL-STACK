import React, { Component } from 'react';

// we import portfolio-item.js and it is labelled as PortfolioItem
// due to portfolio-item.js has only a nonamed function
import PortfolioItem from "./portfolio-item";

// a class component is advance function that allows more advance topics than an functional component
// it allows with events and data managing inside a component with:
// -State
// -Lifecycle hooks
export default class PortfolioContainer extends Component {
  constructor() {
    super();
    this.state = {
      pageTitle : "Welcome to my page",
      data: [
        { title: "Quip", url: "www.quip.com" },
        { title: "Event", url: "eventbrite.org"},
        { title: "Sanity Ministry", url:"www.sanityministry.gob"},
        { title: "IdSoftware", url: "id.software.com"}
      ]
    };
    
  this.handlePageTitleUpdate = this.handlePageTitleUpdate.bind(this);

  }
/*This function here needs to be tied and needs to be bound to this instance of the component.
  So this PortfolioContainer, whenever it is created and rendered on the page, we need to bind
  handlePageTitleUpdate so that it has access to all of this data, such as the page title, so 
  that we can connect it and call this.handlePageTitleUpdate. So this is a way of binding the 
  state and the data of the component to this custom function. */
  handlePageTitleUpdate() {
    this.setState({
      pageTitle: "Something Else"
    });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      // Llamamos a Portfolio que en realidad es la funcion que hay en portfolio-items.js
      // que usamos a modo de "plantilla" y le pasamos los datos title y url, de un parent
      // a un child
      // A continuación pasamos parámetros item.title y item.url a PortfolioItem
      // que los recibirá y verá que hace con ellos
      return <PortfolioItem title={item.title} url={item.url}/>;
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
      /*  In the upper line handlePageTitleUpdate it has to be in blue. VSC thinks it is a funcion when is an instance
          of this.handlePageTitleUpdate.bind(this)
          Whenever you're building out items, such as click listeners, you have to be able to give that click listener
          or that function that you're passing it to, you need to connect it directly into the component, and whenever
          you have a custom function, then you need to be able to be a little more explicit with it.
          So you need to say, "this has access to the 'this' keyword, to the data inside of the component even when it
          is inside of a click listener." That, I know, is confusing, but that is what the key difference is. Whenever
          you have a click listener or any type of event listener or anything like that, you need to bind that function
          directly into the component, and that is what we're doing right there. */
    );
  }
}