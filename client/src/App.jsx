import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
    };
  }

  formHandler = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <div>
        <h1>Add Employee</h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={this.formHandler}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={this.formHandler}
        />
      </div>
    );
  }
}
