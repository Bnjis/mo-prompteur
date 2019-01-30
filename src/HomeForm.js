import React, { Component } from "react";
import PrompterControls from "./PrompterControls";

class HomeForm extends Component {
  addContent = formContent => {
    this.setState({ content: formContent });
  };
  render() {
    return (
      <div className="Home">
        <PrompterControls addContent={this.addContent} />
      </div>
    );
  }
}

export default HomeForm;
