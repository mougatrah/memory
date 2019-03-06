import React, { Component } from 'react';
import './App.css';
import AES from "crypto-js/aes";

const secret = "Secret";
const backgrounds = [
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "yellow",
  "teal",
  "orange",
  "red",
  "green",
  "blue",
  "purple",
  "pink",
  "yellow",
  "orange",
  "teal"
 

];


function shuffle(OLDarray) {
  var array = [...OLDarray];
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
    return <div id={this.props.bg} className="btn border border-light" style={this.props.picked || this.props.matched ? { background: this.props.background } : { background: "grey" }}></div>


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
      wins: 0,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        return {hash: AES.encrypt(bg, secret), bg: bg};
      })
    }

    this.handleClick = this.handleClick.bind(this);
    this.determineMatch = this.determineMatch.bind(this);
    this.reset = this.reset.bind(this);
  } 


  determineMatch() {
    if(this.state.pick1 && this.state.pick2){
      var p1 = AES.decrypt(this.state.pick1, secret).toString();
      var p2 = AES.decrypt(this.state.pick2, secret).toString();
     
     if (p1 === p2) {
     
      try {
        this.setState({
          pick1: null,
          pick2: null,
          matched: [...this.state.matched, this.state.pick1, this.state.pick2],
          matches: this.state.matches + 1
        }, () => {
          if (this.state.matches >= this.state.maxMatches) {
            this.reset();
          }
        });
      } catch (err) {
        console.log("MATCH ERR")
      }
    } else {
    
      try {
        this.setState({
          pick1: null,
          pick2: null,
        })
      } catch (err) {
        console.log("set ERR")
      }
    }
  
    }
   
  }

  handleClick(e) {
    e.preventDefault();

    if (!this.state.matched.includes(e.target.id) && e.target.id !== "resetBtn")
      if (this.state.pick1 === null) {
        this.setState({ pick1: e.target.id });
      } else if (this.state.pick2 === null && this.state.pick1 !== e.target.id) {
        this.setState({ pick2: e.target.id }, () => { setTimeout(this.determineMatch, 1000)});
        
      }
  }

  reset() {

    this.setState({
      pick1: null,
      pick2: null,
      matched: [],
      maxMatches: backgrounds.length / 2,
      matches: 0,
      wins: this.state.wins + 1,
      backgrounds: shuffle(backgrounds).map((bg, index) => {
        var test = {hash: AES.encrypt(bg, secret), bg: bg};
        return test;
      })
    })
  }




  render() {
    return (
      <div className="App container">

        <header className="App-header row bg-light border border-dark">
          <h1 className="m-auto"> MEMORY </h1>
          <div className="col-4">
            <div className="col-12">Score: {this.state.matches}</div>
            <div className='col-12'>Wins: {this.state.wins}</div>
          </div>
          <button id="resetBtn" className="btn btn-danger" onClick={this.reset}>RESET</button>
          
        </header>

        
          <div className="col-12" onClick={this.handleClick}>
            {
              
              this.state.backgrounds.map(((bg, index) => {
                
                return <Card key={index} bg={bg.hash.toString()} picked={this.state.pick1 === bg.hash.toString() || this.state.pick2 === bg.hash.toString()} matched={this.state.matched.includes(bg.hash.toString())}
                  background={bg.bg} />
              }))
            }

          </div>
   





      </div>
    );
  }
}

export default App;
