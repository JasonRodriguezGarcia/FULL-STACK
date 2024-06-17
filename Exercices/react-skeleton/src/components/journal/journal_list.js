import React, { Component } from "react";
import { JournalEntry } from "./journal_entry";

// const rawJournalData = [
//   { title: "Post One", content: "Post content1", status: "draft" },
//   { title: "Post Two", content: "More content2", status: "published" },
//   { title: "Post Three", content: "More content3", status: "published" },
//   { title: "Post Four", content: "More content4", status: "published" }
// ];

export default class JournalList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };


    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.toggleStatus = this.toggleStatus.bind(this);
    this.handleShowAllEntries = this.handleShowAllEntries.bind(this);
    this.handleClearEntriesClick = this.handleClearEntriesClick.bind(this);
  }

  handleDeleteClick(myTitle) {
    // Create finding in element
//    const positionElement = this.props.rawJournalData.findIndex((element) => element.title === myTitle);
    // Deleting position
    this.props.handleDelete(myTitle);
//     this.setState ({
//       rawJournalData: rawJournalData.splice(positionElement,1)
//     })
// //    this.props.rawJournalData.splice(positionElement,1); 
//    console.log(positionElement);
  }

  handleClearEntriesClick() {
    this.setState ({ 
      isOpen: false
    });
    console.log(this.state.isOpen);
    console.log("isOpen", this.state.isOpen);
    this.props.handleClearEntries();
    console.log("isOpen", this.state.isOpen);
  }

  handleShowAllEntries() {
    console.log(this.props.rawJournalData.length);
      this.setState ({ isOpen: true });
      this.toggleStatus();
  }

  toggleStatus() {
    if (this.state.isOpen) {
      console.log("pasando por el SI");
      console.log(this.state.isOpen); 
      this.setState ({ isOpen: false });
      this.props.handleToggleStatus(false);
    } else {
      console.log("pasando por el NO");
      console.log(this.state.isOpen);
      this.setState ({ isOpen: true });
      this.props.handleToggleStatus(true);
    }
 }

  render() {
    const journalEntries = this.props.rawJournalData.map(journalEntry => {
      return (
        <div key={journalEntry.title} style={{
            color:"red",
            display: "grid",
            gridTemplateColumns: "2fr 1fr 6fr"}}>
          <div>
            <JournalEntry
                title={journalEntry.title}
                content={journalEntry.content}
            />
          </div>
          <div className="btn">
             <button onClick={() => this.handleDeleteClick(journalEntry.title)}>Delete</button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1>{this.props.heading}</h1>
        <button onClick={this.handleClearEntriesClick}>Clear Journal Entries</button>
        <button onClick={this.handleShowAllEntries}>Show All Journal Entries</button>
        <button onClick={this.toggleStatus}>Toggle Status</button>
        {journalEntries}        
      </div>
    );
  }
}