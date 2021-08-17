import React, { Component } from "react";
import { Switch, Route, NavLink } from "react-router-dom";
import "./App.css";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";

const App = (props) => {
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
};

export default App;
