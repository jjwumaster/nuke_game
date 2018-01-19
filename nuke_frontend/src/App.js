import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import StartScreen from "./StartScreen";
import MapContainer from "./MapContainer";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridsquares: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/grid_squares")
      .then(resp => resp.json())
      .then(gridsquares => this.setMap(gridsquares));
  }

  setMap = gridsquares => {
    const side = Math.sqrt(gridsquares.length);
    const range = [...Array(side).keys()];
    const output = [];

    for (let y of range) {
      output.push([]);

      // need to make rowSquares a hash...

      let rowSquares = gridsquares
        .filter(gridsquare => {
          return gridsquare["y_coord"] === y + 1;
        })
        .sort((a, b) => {
          return a["x_coord"] - b["x_coord"];
        });

      for (let square in rowSquares) {
        output[y].push(rowSquares[square]);
      }
    }

    this.setState({ gridsquares: output });
  };

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => <StartScreen gridsquares={this.state.gridsquares} />}
          />
          <Route
            exact
            path="/play"
            render={() => <MapContainer gridsquares={this.state.gridsquares} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
