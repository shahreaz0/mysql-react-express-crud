import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import Navbar from "./components/Navbar";

const App = (props) => {
  return (
    <div className="App">
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/employees" component={EmployeeList} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
