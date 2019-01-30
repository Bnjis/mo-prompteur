import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "./App.css";

import MainMenu from "./Menu";
import Prompter from "./Prompter";
//import PrompterControls from "./PrompterControls";
import HomeForm from "./HomeForm";

const DEFAULT_SPEED = 20;
const DEFAULT_FONT_SIZE = 7;

class App extends Component {
  state = {
    content: "test",
    speed: DEFAULT_SPEED,
    fontSize: DEFAULT_FONT_SIZE,
    fontColor: "#fff",
    bgColor: "#000",
    mirror: false
  };

  render() {
    const { content, fontSize, speed } = this.state;
    return (
      <Router>
        <div className="prompter-wrap">
          <MainMenu />
          <Route exact path="/" component={HomeForm} />
          <Route path="/prompter" component={Prompter} />
        </div>
      </Router>
    );
  }
}

export default App;
