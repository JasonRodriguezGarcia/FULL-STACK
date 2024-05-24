import React, { Component } from 'react';
import axios from "axios";

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
      isLoading: false,
//      isLoading: false,
      data: []
    };
    
    this.handleFiltr0 = this.handleFilter.bind(this);

  }
  
  handleFilter(filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter;
      })
    });
  }

  getPortfolioItems() {
    axios
      .get("https://jasonrodriguez.devcamp.space/portfolio/portfolio_items")
      .then(response => {
        this.setState({
          data: response.data.portfolio_items // This portfolio_items is the one from the replied data
        });
      })
      .catch(error => {
        console.log("error producido:", error);
      });
  }

  portfolioItems() {
    return this.state.data.map(item => {
      return <PortfolioItem key={item.id} item={item} />;
    });
  }
  // https://keepcoding.io/blog/estado-y-ciclo-de-vida-de-componentes-en-react/
  // La función componentDidMount se lanzaba después de que el componente se montara en el DOM
  // y se renderizara por primera vez. Dentro de esta función podíamos meter cualquier sección de 
  // código que quisiéramos ejecutar justo en ese momento del ciclo de vida. Este código puede no 
  // tener que ver exactamente con aquello que estamos renderizando, pero puede ser necesario para 
  // introducir datos a nuestro proyecto. Un ejemplo de esto sería una llamada a una API.
  componentDidMount() {
    this.getPortfolioItems();
  }

  render() {
    // This part could be for one API call that once call is finished and all is ok
    // we can change this.state.isLoading to false with this.state.isLoading = false
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }
//    this.getPortfolioItems(); <<-- now componentDidMount() is used
    return (
        <div className='portfolio-items-wrapper'>
          <button className="btn" onClick={() => this.handleFiltr0("eCommerce")}>
            eCommerce
          </button>
          <button className="btn" onClick={() => this.handleFiltr0("Scheduling")}>
            Scheduling
          </button>
          <button className="btn" onClick={() => this.handleFiltr0("Enterprise")}>
            Enterprise
          </button>
          
          {this.portfolioItems()} 
        </div>
      /*<button onClick={this.handleFilter('eCommerce')}>eCommerce</button> Don't work
        The reason why is it has to deal with how JavaScript manages functions that have parentheses.
        Whenever you have this type of syntax what would happen is the page would load and then JavaScript
        would immediately try to run this. So you'd get a bunch of errors, because you would get three
        functions that are all trying to update the state automatically.
        What we need to do is create what's called an anonymous function. We're just going to say I want
        to store these parens, and then an arrow function, and now what this is going to do is it's not 
        going to run automatically, it's going to be placed almost kinda in a holding pattern. The page is
        gonna load and then the functions are going to be ready, but they're not going to be called automatically.
      */
    );
  }
}