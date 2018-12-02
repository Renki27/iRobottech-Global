import React, { Component } from "react";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from "mdbreact";
import "./AdminDashboard.css";
import ClassList from "./ClassList";
import CreateClass from "./CreateClass";
import ViewProfessorClasses from "./ViewProfessorClasses";
import ViewProfessorGroups from "./ViewProfessorGroups";
import ViewProfessorCourses from "./ViewProfessorCourses";
const classList = <ClassList />;
const createClass = <CreateClass />;
const viewClasses = <ViewProfessorClasses />;
const viewGroups = <ViewProfessorGroups />;
const viewCourses = <ViewProfessorCourses />;

class ProfessorDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSelector: ""
    };
    this.selector = this.selector.bind(this);
  }

  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <h5 className="text-center font-weight-bold pl-0 my-4 deep-orange-text">
                Panel de Profesor
              </h5>
              <CardBody>
                <div className="left-box align-box">
                  <ListGroup>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Clases
                    </label>
                    <ListGroupItem
                      hover
                      onClick={this.createNewClass.bind(this)}
                    >
                      Crear clase
                    </ListGroupItem>
                    <ListGroupItem hover onClick={this.loadMyClases.bind(this)}>
                      Ver lista de Clases
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.viewMyClasses.bind(this)}
                    >
                      Mis Clases
                    </ListGroupItem>
                    <ListGroupItem hover onClick={this.viewMyGroups.bind(this)}>
                      Mis Grupos
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.viewMyCourses.bind(this)}
                    >
                      Mis Cursos
                    </ListGroupItem>
                  </ListGroup>
                </div>
              </CardBody>
            </Card>
          </Col>
          <div className="align-box">
            {this.selector(this.state.componentSelector)}
          </div>
        </Row>
      </div>
    );
  }

  selector(componentSelector) {
    switch (componentSelector) {
      case "V_CLA":
        return viewClasses;
      case "V_GRO":
        return viewGroups;
      case "V_COU":
        return viewCourses;
      case "C_CLA":
        return createClass;
      case "L_CLA":
        return classList;
      default:
        return "";
    }
  }
  createNewClass() {
    this.setState({ componentSelector: "C_CLA" });
  }
  viewMyClasses() {
    this.setState({ componentSelector: "V_CLA" });
  }
  viewMyGroups() {
    this.setState({ componentSelector: "V_GRO" });
  }
  viewMyCourses() {
    this.setState({ componentSelector: "V_COU" });
  }
  loadMyClases() {
    this.setState({ componentSelector: "L_CLA" });
  }
}

export default ProfessorDashboard;
