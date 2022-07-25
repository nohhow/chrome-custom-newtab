import React, { Component } from "react";
import Clock from "./Clock";

class Count extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "July, 08, 2023 00:00:00" };
  }
  render() {
    return (
      <div className="w-96 p-6 bg-white rounded shadow-sm m-4">
          <h1 className="mb-3">서울 생활 끝</h1>
          <div className="mb-3"><mark>{this.state.deadline}</mark></div>
          <Clock deadline={this.state.deadline} />
      </div>
    );
  }
}
export default Count;
