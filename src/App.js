import React, { Component } from "react";

import Playfield from "./components/Playfield";
import KeyBindings from "./components/KeyBindings";
import TouchControls from "./components/TouchControls";

class App extends Component {
  render() {
    return (
      <>
        <Playfield />
        <KeyBindings />
        <TouchControls />
      </>
    );
  }
}

export default App;
