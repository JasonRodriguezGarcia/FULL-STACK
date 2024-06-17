// https://github.com/jordanhudgens/ReactPropStateThisDeepDive
import React, { Component } from "react";
import JournalList from "./journal/journal_list";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      rawJournalData : [
        { title: "Post One", content: "Post content1", status: "draft", open: true },
        { title: "Post Two", content: "More content2", status: "published", open: true },
        { title: "Post Three", content: "More content3", status: "published", open: true },
        { title: "Post Four", content: "More content4", status: "published", open: true }
      ],
    };

    this.handlePopulateRaw = this.handlePopulateRaw.bind(this);
    this.handleToggleStatus = this.handleToggleStatus.bind(this);
    this.handleClearEntries = this.handleClearEntries.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(myTitle){
    const positionElement = this.state.rawJournalData.findIndex((element) => element.title === myTitle);
    console.log("positionElement",positionElement);
    this.setState ({
      rawJournalData: this.state.rawJournalData.filter(data =>{
        return data.title != myTitle;
      })
    });
    console.log ("longitud Datos", this.state.rawJournalData.length);
  }

  handleClearEntries() {
    this.setState ({ rawJournalData: []});
  }
  handlePopulateRaw() {
    this.setState ({
      rawJournalData: [
        { title: "Post One", content: "Post content1", status: "draft", open: true },
        { title: "Post Two", content: "More content2", status: "published", open: true },
        { title: "Post Three", content: "More content3", status: "published", open: true },
        { title: "Post Four", content: "More content4", status: "published", open: true }
      ]
    });  
  }
  handleToggleStatus(toggleStatus) {
    if (toggleStatus) {
      this.handlePopulateRaw();
    } else {
      this.setState ({
        rawJournalData: this.state.rawJournalData.filter((element) => {
          return element.open === toggleStatus;
        })
      });
    }
  }

  render() {
    return (
      <div>
        <h1>React, Props, and State Deep Dive</h1>

        <JournalList heading="List 1" 
          rawJournalData={this.state.rawJournalData} 
          handleDelete={this.handleDelete}
          handleClearEntries={this.handleClearEntries}
          handlePopulateRaw={this.handlePopulateRaw}
          handleToggleStatus={this.handleToggleStatus}/>
        <JournalList heading="List 2"
          rawJournalData={this.state.rawJournalData} 
          handleDelete={this.handleDelete}
          handleClearEntries={this.handleClearEntries}
          handlePopulateRaw={this.handlePopulateRaw}
          handleToggleStatus={this.handleToggleStatus}/>
      </div>
    );
  }
}