import React, { Component } from "react";
import { JournalEntry } from "./journal_entry";

const rawJournalData = [
  { title: "Post One", content: "Post content1", status: "draft" },
  { title: "Post Two", content: "More content2", status: "published" },
  { title: "Post Three", content: "More content3", status: "published" },
  { title: "Post Four", content: "More content4", status: "published" }
];

export default class JournalList extends Component {
  constructor(props) {
    super();

    this.state = {
      journalData: rawJournalData,
      isOpen: true
    };

    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete(myTitle) {
    // Create finding in element
    const toFind = (element) => element.title === myTitle;
    // Using finding to have position
//    const positionElement = rawJournalData.findIndex(toFind);
    const positionElement = rawJournalData.findIndex((element) => element.title === myTitle);
    console.log(myTitle, rawJournalData);
    console.log(positionElement);
    // Deleting position
    rawJournalData.splice(positionElement,1); 
    console.log(rawJournalData);
    this.setState ({
         journalData: rawJournalData
    });
  }

  clearEntries = () => {
    this.setState({ journalData: [], isOpen: false });
  };

  showAllEntries = () => {
    this.setState({ journalData: rawJournalData, isOpen: true });
  };

  toggleStatus = () => {
    if (this.state.isOpen) {
      this.setState({ journalData: [], isOpen: false });
    } else {
      this.setState({ journalData: rawJournalData, isOpen: true });
    }
  };

  render() {
    const journalEntries = this.state.journalData.map(journalEntry => {
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
             <button onClick={() => this.handleDelete(journalEntry.title)}>Delete</button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <h1>{this.props.heading}</h1>
        <button onClick={this.clearEntries}>Clear Journal Entries</button>
        <button onClick={this.showAllEntries}>Show All Journal Entries</button>
        <button onClick={this.toggleStatus}>Toggle Status</button>
        {journalEntries}        
      </div>
    );
  }
}