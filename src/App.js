import React, { Component } from 'react';
import bcrypt from "bcrypt-nodejs";
import './App.css';
// import { nextTick } from 'q';

const backgrounds = [
  "red",
  "red",
  "green",
  "green"

];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



class Card extends Component {



  render() {
    console.log(this.props.picked + " " + this.props.matched)
    return <div id={this.props.bg} className="btn col-4 border border-light" style={this.props.picked || this.props.matched ? { background: this.props.background } : { background: "grey" }}>TEST</div>


  }


}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pick1: null,
      pick2: null,
      matched: ["test"],
      maxMatches: backgrounds.length / 2,
      matches: 0,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        return bcrypt.hashSync(bg)
      })
    }

    this.handleClick = this.handleClick.bind(this);
    this.determineMatch = this.determineMatch.bind(this);

  }


  determineMatch() {
    if (
      !backgrounds.some(bg => {

        var p1 = bcrypt.compareSync(bg, this.state.pick1);
        var p2 = bcrypt.compareSync(bg, this.state.pick2);

        if (p1 && p2) {
          console.log("MATCH")

          return true;
        }
        return false;
      })
    ) {
      try {
        this.setState({
          pick1: null,
          pick2: null,

        })
      } catch (err) {
        console.log("set ERR")
      }
    } else {
      try {
        this.setState({
          pick1: null,
          pick2: null,
          matched: [...this.state.matched, this.state.pick1, this.state.pick2],
          matches: this.state.matches + 1
        }, () => {
          console.log(this.state.matches >= this.state.maxMatches)
          if (this.state.matches >= this.state.maxMatches) {
            this.reset();
          }
        })
      } catch (err) {
        console.log("MATCH ERR")
      }
    }

  }

  handleClick(e) {
    e.preventDefault();

    console.log(e.target.id)


    if (!this.state.matched.includes(e.target.id) && this.state.backgrounds.includes(e.target.id))
      if (this.state.pick1 === null) {
        this.setState({ pick1: e.target.id });
      } else if (this.state.pick2 === null) {
        this.setState({ pick2: e.target.id }, () => setTimeout(this.determineMatch, 1500));

      }
  }

  reset() {
    this.setState({
      pick1: null,
      pick2: null,
      matched: ["test"],
      maxMatches: backgrounds.length / 2,
      matches: 0,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        return bcrypt.hashSync(bg)
      })
    })
  }




  render() {

    return (
      <div className="App container">

        <header className="App-header row bg-light border border-dark">
          <h1 className="m-auto"> HEADER </h1>
        </header>

        <div className="row">
          <div className="col-12" onClick={this.handleClick}>
            {
              this.state.backgrounds.map(((bg, index) => {
                return <Card key={index} bg={bg} picked={this.state.pick1 === bg || this.state.pick2 === bg} matched={this.state.matched.includes(bg)}
                  background={backgrounds.find((el) => {
                    return bcrypt.compareSync(el, bg);
                  })} />
              }))
            }

          </div>
        </div>





      </div>
    );
  }
}

export default App;
