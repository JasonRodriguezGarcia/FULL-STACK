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
      pateTitle : "Welcome to my page",
      data: [
        { title: "Quip", url: "www.quip.com" },
        { title: "Event", url: "eventbrite.org"},
        { title: "Sanity Ministry", url:"www.sanityministry.gob"},
        { title: "IdSoftware", url: "id.software.com"}
      ]
    };
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
        <h2>Porfolio items go here ...</h2>
        {this.portfolioItems()}
      </div>
    );
  }
}