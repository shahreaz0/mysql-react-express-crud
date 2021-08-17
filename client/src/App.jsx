import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/employees">
                All Employees
              </NavLink>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={EmployeeForm} />
          <Route exact path="/employees" component={EmployeeList} />
        </Switch>
      </div>
    );
  }
}
