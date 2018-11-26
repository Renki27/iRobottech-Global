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
import StudentAttendance from "./StudentAttendance";
const classList = <ClassList />;
const studentAttendance = <StudentAttendance />;

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
                    <ListGroupItem hover onClick={this.loadMyClases.bind(this)}>
                      Ver lista de Clases
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.takeAttendance.bind(this)}
                    >
                      Tomar Asistencia
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
      case "L_CLA":
        return classList;
      case "S_ATT":
        return studentAttendance;
      default:
        return "";
    }
  }

  loadMyClases() {
    this.setState({ componentSelector: "L_CLA" });
  }
  takeAttendance() {
    this.setState({ componentSelector: "S_ATT" });
  }
}

export default ProfessorDashboard;
