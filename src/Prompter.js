import PropTypes from "prop-types";
import React, { Component } from "react";

import "./Prompter.css";

const MPT_KEY = "::Propter::PromptContent";

// function easeOutCuaic(t) {
//   t--;
//   return t * t * t + 1;
// }

function linearTween(t) {
  return t;
}

function scrollTo(element, duration) {
  var e = document.documentElement;
  if (e.scrollTop === 0) {
    var t = e.scrollTop;
    ++e.scrollTop;
    e = t + 1 === e.scrollTop-- ? e : document.body;
  }
  scrollToC(e, e.scrollTop, element, duration);
}

// Element to move, element or px from, element or px to, time in ms to animate
function scrollToC(element, from, to, duration) {
  if (duration <= 0) return;
  if (typeof from === "object") from = from.offsetTop;
  if (typeof to === "object") to = to.offsetTop;

  scrollToX(element, from, to, 0, 1 / duration, 20, linearTween);
}

function scrollToX(element, xFrom, xTo, t01, speed, step, motion) {
  if (t01 < 0 || t01 > 1 || speed <= 0) {
    element.scrollTop = xTo;
    return;
  }
  element.scrollTop = xFrom - (xFrom - xTo) * motion(t01);
  t01 += speed * step;

  window.scrollTimer = setTimeout(function() {
    scrollToX(element, xFrom, xTo, t01, speed, step, motion);
  }, step);
}

class Prompter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.promptContent,
      fontSize: this.props.fontSize,
      speed: this.props.scrollSpeed,
      mirror: false,
      isStart: false,
      sWMode: false,
      distanceFromTop: 0
    };
  }
  static propTypes = {
    fontSize: PropTypes.number.isRequired
  };

  startPrompter = () => {
    let $prompter = document.querySelector(".prompter");

    let documentScrollTop = document.documentElement.scrollTop;
    let duration =
      $prompter.clientHeight * (this.state.speed == 0 ? 1 : this.state.speed);
    if (!this.state.isStart) {
      if (documentScrollTop > 0) {
        var ratio = documentScrollTop / $prompter.clientHeight;

        duration = duration * (1 - ratio);
      }

      scrollTo(
        document.documentElement.scrollHeight -
          document.documentElement.clientHeight,
        duration
      );
    } else {
      let currentScrollTop = document.documentElement.scrollTop;

      clearTimeout(window.scrollTimer);
      scrollTo(currentScrollTop, 1);
    }
    this.setState({ isStart: !this.state.isStart });

    // window.scrollBy({
    //   top: 100, // could be negative value
    //   left: 0,
    //   behavior: "smooth"
    // });
  };

  startstarWarsMode = () => {
    var x = document.getElementById("myAudio");
    this.setState({ sWMode: !this.state.sWMode }, () => {
      if (this.state.sWMode) {
        x.play();
      } else {
        x.pause();
        x.currentTime = 0;
      }
    });
  };

  componentWillMount() {
    const entries = JSON.parse(localStorage.getItem(MPT_KEY) || "[]");

    this.setState({
      text: entries.content,
      fontSize: entries.fontSize,
      mirror: entries.mirror,
      speed: 100 - entries.speed
    });
  }
  componentDidUpdate() {}

  componentWillUnmount() {
    clearTimeout(window.scrollTimer);
    scrollTo(0, 1);
  }

  render() {
    const { fontSize, text, speed, mirror, isStart, sWMode } = this.state;
    let newClasses = mirror ? "mirror" : "";
    let swClass = sWMode ? "starwars" : "";
    return (
      <div className="prompterView">
        <div className="buttonwrap">
          <button onClick={this.startPrompter}>
            {isStart ? "Pause" : "Start"}
          </button>
          <button className="swbutton" onClick={this.startstarWarsMode}>
            {sWMode ? "Clear SW mode" : "Go SW mode"}
          </button>
          <audio id="myAudio" controls>
            <source src="./audio/swsong.mp3" />
            <source src="./audio/swsong.ogg" />
            <source src="./audio/swsong.m3u" />
          </audio>
        </div>
        <div className={"prompWrap " + swClass}>
          <div
            className={"prompter " + newClasses}
            style={{ fontSize: fontSize + "px" }}
          >
            {text}
          </div>
        </div>
      </div>
    );
  }
}

export default Prompter;
