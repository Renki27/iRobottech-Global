import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "../pages/Home.js";
import About from "../pages/About.js";
import Courses from "../pages/Courses.js";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import RegisterStudent from "../pages/RegisterStudent";
import FooterPage from "../components/Footer.js";
import RegisterProfessor from "../pages/RegisterProfessor";
import RegisterSecretary from "../pages/RegisterSecretary";
import RegisterAdmin from "../pages/RegisterAdmin";
import Profile from "../pages/Profile";
import Navbar from "../components/Navbar";
import RecoverPage from "../pages/RecoverPage";
import EditProfile from "../pages/EditProfile";
import EditPass from "../pages/EditPass";
import Enrollment from "../pages/Enrollment";
import EnrollmentReport from "../pages/EnrollmentReport";
import "./App.css";
import { View, Mask } from "mdbreact";
class App extends Component {
  render() {
    return (
      <Switch>
        <div className="App ">
          <div className="Container">
            {/* Component en minuscula */}
            <Navbar />

            <Route exact path="/" component={Home} />

            <Route exact path="/RecoverPage" component={RecoverPage} />
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
            <Route exact path="/editProfile" component={EditProfile} />
            <Route exact path="/EditPass" component={EditPass} />
            <Route
              exact
              path="/EnrollmentReport:myId"
              component={EnrollmentReport}
            />
            <Route exact path="/Courses" component={Courses} />
          </div>

          <FooterPage />
        </div>
      </Switch>
    );
  }
}

export default App;
