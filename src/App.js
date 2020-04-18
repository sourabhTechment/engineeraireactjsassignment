import React from 'react';
import './App.css';

import DetailsComponent from "./details.component";

const apiKey = "GwayqidnOANw3EqxCrYkRgNIzihG0rI89FIsDJfS";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      asteroidIDInputFieldVal: "",
      asteroidPageData: {},
      showAsteroidData: true
    }
  }

  searchAsteroidWithId = () => {

    if(this.state.asteroidIDInputFieldVal.trim() !== "") {
      fetch(`https://api.nasa.gov/neo/rest/v1/neo/`+this.state.asteroidIDInputFieldVal+`?api_key=`+apiKey).then(response => response.json()).then((response) => {
        console.log(response);
        response.is_potentially_hazardous_asteroid = response.is_potentially_hazardous_asteroid.toString();
        this.setState({
          asteroidPageData: response,
          showAsteroidData: true
        });
      }).catch((err) => {
        console.log(err);
      });
    }

  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }
  generateRandomAsteroidID = () => {
    fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=`+apiKey).then(response => response.json()).then((response) => {
      console.log(response);
      var maxRange = response.page.size;
      var selectedIndex = this.getRandomInt(maxRange-1);
      console.log(maxRange + "   " + selectedIndex);
      var selectedAsteroidId = response.near_earth_objects[selectedIndex].id
      if(selectedAsteroidId) {
        this.setState({
          asteroidIDInputFieldVal: selectedAsteroidId
        },() => {
          fetch(`https://api.nasa.gov/neo/rest/v1/neo/`+selectedAsteroidId+`?api_key=`+apiKey).then(response => response.json()).then((response) => {
            response.is_potentially_hazardous_asteroid = response.is_potentially_hazardous_asteroid.toString();
            this.setState({
              asteroidPageData: response,
              showAsteroidData: true
            });
          });
        });
      }
    });
  }

  handleInputForAsteroidID = (evt) => {
    this.setState({
      asteroidIDInputFieldVal: evt.target.value
    });
  }
  render() {
    return (
      <div>
        <form className="">
          <div>
            <input id="enterAsteroidID" name="enterAsteroidID" placeholder="Enter Asteroid ID" value={this.state.asteroidIDInputFieldVal} onChange={this.handleInputForAsteroidID} required/>
          </div>
          <div>
            <button onClick={this.searchAsteroidWithId} type="button" disabled={!this.state.asteroidIDInputFieldVal}>Submit</button>
          </div>
        </form>
        
        <button id="randomAsteroidBtn" onClick={this.generateRandomAsteroidID}>Random Asteroid</button>

        <DetailsComponent asteroidPageData= {this.state.asteroidPageData}/>
        
      </div>
    );
  }
}

export default App;
