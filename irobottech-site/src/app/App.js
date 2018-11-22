import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "../pages/Home.js";
import About from "../pages/About.js";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import RegisterStudent from "../pages/RegisterStudent";
import FooterPage from '../components/Footer.js';
import RegisterProfessor from "../pages/RegisterProfessor";
import RegisterSecretary from "../pages/RegisterSecretary";
import RegisterAdmin from "../pages/RegisterAdmin";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";

import "./App.css";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="App">
          {/* Component en minuscula */}
          <Navbar />
          <Route exact path="/" component={Home} />
          <div className="Container">
            <Route exact path="/About" component={About} />
            <Route exact path="/Contact" component={Contact} />
            <Route exact path="/Login" component={Login} />
            <Route exact path="/RegisterStudent" component={RegisterStudent} />
            <Route exact path="/profile" component={Profile} />
            <Route
              exact
              path="/RegisterProfessor"
              component={RegisterProfessor}
            />
            <Route
              exact
              path="/RegisterSecretary"
              component={RegisterSecretary}
            />
            <Route exact path="/RegisterAdmin" component={RegisterAdmin} />
          </div>
          <FooterPage />
        </div>
      </HashRouter>
    );
  }
}

export default App;
