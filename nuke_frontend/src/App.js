import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import StartScreen from "./StartScreen"
import MapContainer from "./MapContainer"

class App extends React.Component {
  render() {
    return <StartScreen />
  }
}

export default App
