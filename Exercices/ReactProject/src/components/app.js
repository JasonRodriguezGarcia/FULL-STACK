import React, { Component } from 'react';
import moment from "moment"

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1>DevCamp React Starter</h1>
        <h2>React Bootstrap</h2>
        <h3>Eto e la otia !!!</h3>
        <div>{moment().format('MMMM Do YYYY, h:mm:ss a')}</div>
      </div>
    );
  }
}
