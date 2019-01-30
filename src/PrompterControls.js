import PropTypes from "prop-types";
import React, { Component } from "react";

import "./PrompterControls.css";

const MPT_KEY = "::Propter::PromptContent";

class PrompterControls extends Component {
  constructor(props) {
    super(props);

    const entries = JSON.parse(localStorage.getItem(MPT_KEY) || "[]");

    this.state = {
      prompterContent: entries.content,
      fontSize:
        "fontSize" in entries && entries.fontSize.length
          ? entries.fontSize
          : 16,
      mirror: "mirror" in entries ? entries.mirror : false,
      speed: "speed" in entries ? entries.speed : 50
    };
  }
  static propTypes = {
    prompterContent: PropTypes.string
    // fontSize: PropTypes.number.isRequired,
    // mirror: PropTypes.bool.isRequired
  };

  handleContentUpdate = event => {
    this.setState(
      {
        prompterContent: event.target.value
      },
      () => {
        this.submitHandler();
      }
    );
  };
  handleFontSizeUpdate = event => {
    let reg = /^[0-9]+$/;
    let fontSizeValue = event.target.value;

    if (fontSizeValue >= 0 && fontSizeValue <= 110 && reg.test(fontSizeValue)) {
      this.setState({ fontSize: event.target.value }, () => {
        this.submitHandler();
      });
    }
  };

  handleCheck = event => {
    this.setState({ mirror: !this.state.mirror }, () => {
      this.submitHandler();
    });
  };

  handleRange = event => {
    this.setState({ speed: event.target.value }, () => {
      this.submitHandler();
    });
  };

  //FIX binding
  submitHandler = () => {
    //const entries = JSON.parse(localStorage.getItem(MPT_KEY) || "[]");

    let newEntry = {};

    newEntry.id = Date.now();
    newEntry.fontSize = this.state.fontSize;
    newEntry.content = this.state.prompterContent;
    newEntry.mirror = this.state.mirror;
    newEntry.speed = this.state.speed;

    localStorage.setItem(MPT_KEY, JSON.stringify(newEntry));
    //onStored(entries);
  };

  render() {
    const { fontSize } = this.state;

    let textClass = this.state.mirror ? "mirror" : "";
    return (
      <div className="form-wrapper">
        <h1>Mo Prompter</h1>
        <form className="prompterInput" onSubmit={this.submitHandler}>
          <div className="3-cols">
            <p>
              <label>
                Taille de la police
                <input
                  type="text"
                  onChange={this.handleFontSizeUpdate}
                  value={this.state.fontSize}
                />
              </label>
            </p>
            <p>
              <label>
                Effet Mirroir (En utilisant un vrais prompter)
                <input
                  type="checkbox"
                  onChange={this.handleCheck}
                  value={this.state.fontSize}
                />
              </label>
            </p>
            <p>
              <label>
                Speed
                <input
                  type="range"
                  min="90"
                  max="100"
                  onChange={this.handleRange}
                  value={this.state.speed}
                />
              </label>
            </p>
          </div>
          <p>
            <label>
              Entre le contenu du prompter ici
              <textarea
                style={{ fontSize: fontSize + "px" }}
                onChange={
                  this.handleContentUpdate //autoComplete="given-name"
                }
                value={this.state.prompterContent}
                className={textClass}
              />
            </label>
          </p>
          {/* <button type="submit">Save !!</button> */}
        </form>
      </div>
    );
  }
}

export default PrompterControls;
