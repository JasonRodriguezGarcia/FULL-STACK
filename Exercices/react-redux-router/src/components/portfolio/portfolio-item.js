import React, { Component } from "react";
import { Link } from "react-router-dom";
// this is a functional component, and simple function that allows us
// less functionality than a class function, it allows to:
// render content, pass data, images, info ...
export default class PortfolioItem extends Component { // props are like parameters
  constructor(props) {
    super(props);

    this.state = {
      portfolioItemClass: ""
    };
  }

  handleMouseEnter () {
    this.setState({ portfolioItemClass: "image-blur"});
  }
  handleMouseLeave () {
    this.setState({ portfolioItemClass: ""});
  }

  render() {
    const {id, description, thumb_image_url, logo_url } = this.props.item;
    return (
      <div className="portfolio-item-wrapper"
        onMouseEnter={() => this.handleMouseEnter()}
        onMouseLeave={() => this.handleMouseLeave()}
      >

        {/* Adding backgroundImage to the style dynamically with self-closed <div>, that why for {{ and }} */}
        <div 
          className={"portfolio-img-background " + this.state.portfolioItemClass}
          style={{
            backgroundImage: "url(" + thumb_image_url + ")"
          }}
        />

        <div className="img-text-wrapper">
          <div className="logo-wrapper">
            <img src={logo_url} />
          </div>

          <div className="subtitle">{description}</div>
        </div>
      </div>
    );
  }
}