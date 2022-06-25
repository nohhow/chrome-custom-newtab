import React, { Component } from "react";
import Clock from "./Clock";

class Count extends Component {
  constructor(props) {
    super(props);
    this.state = { deadline: "March, 05, 2023 00:00:00" };
  }
  render() {
    return (
      <div className="w-full p-6 m-4 bg-white rounded shadow-sm lg:w-3/4 lg:max-w-lg">
          <h1 className="mb-3">종강까지</h1>
          <div className="mb-3"><mark>{this.state.deadline}</mark></div>
          <Clock deadline={this.state.deadline} />
      </div>
    );
  }
}
export default Count;
