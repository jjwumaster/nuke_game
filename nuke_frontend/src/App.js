import React from "react";
import MapContainer from "./MapContainer";
import Editor from "./Editor";

class App extends React.Component {
  render() {
    return (
      <div>
        <Editor />
        <MapContainer />
      </div>
    );
  }
}

export default App;
