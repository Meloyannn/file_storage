import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import './App.css';
import SignIn from "./pages/signin/signin"
import SignUp from "./pages/signup/signup"
import Home from "./pages/home/home"

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
