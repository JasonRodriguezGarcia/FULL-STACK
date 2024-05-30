import React, { Component } from 'react';
import axios from "axios";

import PortfolioForm from "../portfolio/portfolio-form";
import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
export default class PortfolioManager extends Component {
  constructor() {
    super();

    this.state = {
      portfolioItems: []
    };

    this.handleSuccesfulFormSubmission=this.handleSuccesfulFormSubmission.bind(this);
    this.handleFormSubmissionError=this.handleFormSubmissionError.bind(this);
  }

  handleSuccesfulFormSubmission(portfolio_item) {
    // update portfolioItems state
    // add portfolioItems to the list
    alert("GRABANDO REGISTRO");
    // to check reply from API in portfolio-form handleSubmit()
    // console.log("handleSuccesfulFormSubmission", portfolio_item);
    this.setState ({
          // this is in JavaScript
//      portfolioItems: this.state.portfolioItems.contact(portfolio_item)
          // in React we add portfolio_item as an array item (between [])
          // to be added to the begining of portfolioItems array with concat
          // ADDING AND ARRAY ITEM TO AN ARRAY
          portfolioItems: [portfolio_item].concat(this.state.portfolioItems)
          // but the order dissapears is we refresh with F5 and it will appears
          // at the end, that is the normal behaviour
          // because the order in portfolioItems change each time the API
          // is called and retrieves data, takes in recorded order.
          // Then we change the call to API in getPortfolioItems()
          // with parameters with ?
    });
  }

  handleFormSubmissionError() {
    console.log("handleFormSubmissionError error ***, error");
  }

  getPortfolioItems() {
    axios   // Calling API items with paremeters ("?") ordered by ("=") create date/time and ("&") descending
      .get("https://jasonrodriguez.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc", { withCredentials: true})
      .then(response => {
        this.setState ({
          portfolioItems: [...response.data.portfolio_items]
        })
      })
      .catch(error => {
        console.log("Error in portfolio items:***", error);
      });
  }

  componentDidMount() {
    this.getPortfolioItems();
  }
  render() {
    return (
      <div className='portfolio-manager-wrapper'>
        <div className='left-column'>
          <PortfolioForm 
            handleSuccesfulFormSubmission={this.handleSuccesfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}/>
        </div>
        <div className='right-column'>
          <PortfolioSidebarList data={this.state.portfolioItems}/>
          {/* <div>LISTADO....</div> */}
        </div>
      </div>
    )
  }
}
