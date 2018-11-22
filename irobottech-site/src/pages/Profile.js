import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import ProfessorDashboard from "./ProfessorDashboard";

const adminView = <AdminDashboard />;
const professorView = <ProfessorDashboard />;
const selection = "";
const selector = "";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      accountType: ""
    };
    this.dashboardSelector = this.dashboardSelector.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.username,
      email: decoded.email,
      account_type: decoded.account_type
    });
  }

  dashboardSelector(account_type) {
    switch (account_type) {
      case "ADMIN":
        return adminView;
      case "PROFESSOR":
        return professorView;
      default:
        return "";
    }
  }

  render() {
    return (
      <div>
        {this.dashboardSelector(this.state.account_type)}
        <h1>{this.state.email}</h1>
        <h1>{this.state.account_type}</h1>
      </div>
    );
  }
}

export default Profile;
