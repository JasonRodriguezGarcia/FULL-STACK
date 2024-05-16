// https://github.com/jordanhudgens/ReactPropStateThisDeepDive
import React, { Component } from "react";
import JournalList from "./journal/journal_list";

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>React, Props, and State Deep Dive</h1>

        <JournalList heading="List 1" />
        <JournalList heading="List 2" />
      </div>
    );
  }
}