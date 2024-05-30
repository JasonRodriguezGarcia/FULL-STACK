import React, { Component } from "react";
import axios from "axios";

// Dropzone lines needed to work with import librarY and .css styles
import DropzoneComponent from "react-dropzone-component";
import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      category: "eCommerce", // DEFAULT VALUE HAS TO BE ASSIGNED BECAUSE DROPDOWN ONCHANGE IF ISN'T EXECUTED!!!
      position: "",
      url: "",
      thumb_image: "",
      banner_image: "",
      logo: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleThumbDrop = this.handleThumbDrop.bind(this);
    this.handleBannerDrop = this.handleBannerDrop.bind(this);
    this.handleLogoDrop = this.handleLogoDrop.bind(this);

    this.thumbRef = React.createRef();
    this.bannerRef = React.createRef();
    this.logoRef = React.createRef();

  }
  //
  // Dropzone methods needed to work
  handleThumbDrop() {
    return {
      addedfile: file => this.setState({ thumb_image: file })
    };
  }

  handleBannerDrop() {
    return {
      addedfile: file => this.setState({ banner_image: file })
    };
  }

  handleLogoDrop() {
    return {
      addedfile: file => this.setState({ logo: file })
    };
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    };
  }
// End of Dropzone methods
//

  buildForm() {
    let formData = new FormData();

    formData.append("portfolio_item[name]", this.state.name);
    formData.append("portfolio_item[description]", this.state.description);
    formData.append("portfolio_item[url]", this.state.url);
    formData.append("portfolio_item[category]", this.state.category);
    formData.append("portfolio_item[position]", this.state.position);
    if (this.state.thumb_image) {
      formData.append("portfolio_item[thumb_image]", this.state.thumb_image);
    }
    if (this.state.banner_image) {
      formData.append("portfolio_item[banner_image]", this.state.banner_image);
    }
    if (this.state.logo) {
      formData.append("portfolio_item[logo]", this.state.logo);
    }
    console.log(formData);

    return formData;
  }

  handleChange(event) {
    this.setState ({
      // whatever the item is, it will receive it's value
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    axios
      .post(
        "https://jasonrodriguez.devcamp.space/portfolio/portfolio_items",
        this.buildForm(), // Sending formData
        { withCredentials: true } // Using credentials from login Cookie
      )
      .then(response => { // that is that gets returned when we have a succesful record created
                          // and we pass to handleSuccesfulFormSubmission
        this.props.handleSuccesfulFormSubmission(response.data.portfolio_item);
//      to see response data replied->  console.log("response", response);
      // After Submit another thing to do is we have to reset to empty all items in form 
        this.setState ({
          name: "",
          description: "",
          category: "eCommerce", // DEFAULT VALUE HAS TO BE ASSIGNED BECAUSE DROPDOWN ONCHANGE IF ISN'T EXECUTED!!!
          position: "",
          url: "",
          thumb_image: "",
          banner_image: "",
          logo: ""
        });
        // Also reset the DropzoneComponents by Refs, deleting the file contained in each of them 
        // via function arrow with 3 arguments we wrapp in an array
        [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
          ref.current.dropzone.removeAllFiles()
        });

      })
      .catch(error => {
        console.log("portfolio form handleSubmit error", error);
      });

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="portfolio-form-wrapper">
        <div className="two-column">
          <input
            type="text"
            name="name"
            placeholder="Portfolio Item Name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <input
            type="text"
            name="url"
            placeholder="URL"
            value={this.state.url}
            onChange={this.handleChange}
          />
        </div>

        <div className="two-column">
          <input
            type="number"
            min="0" max="999999999"
            name="position"
            placeholder="Position"
            value={this.state.position}
            onChange={this.handleChange}
          />

          <select
            className="select-element"
            name="category"
            placeholder="Category"
            onChange={this.handleChange}
          >
            <option value="eCommerce">eCommerce</option>
            <option value="Scheduling">Scheduling</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Computers">Computers</option>
            <option value="Maritime Transportation">Maritime Transportation</option>
          </select>
        </div>

        <div className="one-column">
          <textarea
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </div>

        <div className="image-uploaders">
          <DropzoneComponent
            // These 2 methods have to be runned inmediately, Dropzone requirements,
            // that's why in parents "()"
            ref={this.thumbRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleThumbDrop()}
          >
            <div className="dz-message">Thumbnail</div>
          </DropzoneComponent>

          <DropzoneComponent
            ref={this.bannerRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleBannerDrop()}
          >
            <div className="dz-message">Banner</div>
          </DropzoneComponent>

          <DropzoneComponent
            ref={this.logoRef}
            config={this.componentConfig()}
            djsConfig={this.djsConfig()}
            eventHandlers={this.handleLogoDrop()}
          >
            <div className="dz-message">Logo</div>
          </DropzoneComponent>
        </div>

        <div>
          <button className="btn" type="submit">Save</button>
        </div>
      </form>
    );
  }
}