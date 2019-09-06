import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import SignIn from "./pages/signin/signin"
import SignUp from "./pages/signup/signup"
import Home from "./pages/home/home"
function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={SignIn}/>
          <Route path="/signup" component={SignUp}/>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
