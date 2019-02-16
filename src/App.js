import React, { Component } from 'react';

import './App.css';

const backgrounds = [
  "red",
  "blue"


]

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {

      style: {
        "background": props.background
      }

    }
  }

  render() {
    return (
      <div style={this.state.style} className="col-4 border border-dark" >
        Test
      </div>
    );
  }


}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick1: null,
      pick2: null,
      maxMatches: backgrounds.length * 2,
      matches: 0
    }
  }

  componentDidMount() {

  }

  render() {

    return (
      <div className="App container">

        <header className="App-header row bg-light border border-dark">
          <h1 className="m-auto"> HEADER </h1>
        </header>

        <div className="row">
        <Card background={backgrounds[0]}/>
        <Card background={backgrounds[1]}/>

        </div>





      </div>
    );
  }
}

export default App;
