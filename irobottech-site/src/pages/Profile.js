import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./AdminDashboard";
import ProfessorDashboard from "./ProfessorDashboard";
import SecretaryDashboard from "./SecretaryDashboard";
import StudentDashboard from "./StudentDashboard";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  label,
  NavLink,
  CardBody
} from "mdbreact";
const adminView = <AdminDashboard />;
const secretaryView = <SecretaryDashboard />;
const professorView = <ProfessorDashboard />;
const studentView = <StudentDashboard />;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      account_type: ""
    };
    this.dashboardSelector = this.dashboardSelector.bind(this);
  }

  componentWillMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.username,
      email: decoded.email,
      account_type: decoded.account_type
    });
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

  shouldComponentUpdate(next_props, next_state) {
    return false;
  }

  dashboardSelector(account_type) {
    switch (account_type) {
      case "ADMIN":
        return adminView;
      case "PROFESSOR":
        return professorView;
      case "SECRETARY":
        return secretaryView;
      case "STUDENT":
        return studentView;
      default:
        return "";
    }
  }

  render() {
    return (
      <div>
        <Col>{this.dashboardSelector(this.state.account_type)}</Col>

          <Col className="mx-auto mt-5">
            <Card>
              <CardBody>
                <h1>{this.state.email}</h1>
                <h1>{this.state.account_type}</h1>
              </CardBody>
            </Card>
          </Col>

      </div>
    );
  }
}

export default Profile;
