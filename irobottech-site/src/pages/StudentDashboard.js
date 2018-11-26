import React, { Component } from "react";
import { ListGroup, ListGroupItem, Link,
  Container,
  Row,
  Col,
  Card,
  CardBody } from "mdbreact";
import "./AdminDashboard.css";
import SendMessage from "./SendMessage";
const sendMessage = <SendMessage />;

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSelector: ""
    };
    this.selector = this.selector.bind(this);
  }

  selector(componentSelector) {
    switch (componentSelector) {
      case "SEND_M":
        return sendMessage;
      default:
        return "";
    }
  }

  sendMessage() {
    this.setState({ componentSelector: "SEND_M" });
  }

  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <h5 className="text-center font-weight-bold pl-0 my-4 deep-orange-text">
                Panel de Estudiante
              </h5>
              <CardBody>
                <div className="left-box align-box">
                  <ListGroup>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Curso
                    </label>
                    <ListGroupItem hover onClick={this.sendMessage.bind(this)}>
                      Solicitar cambio de clase
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
}

export default StudentDashboard;
