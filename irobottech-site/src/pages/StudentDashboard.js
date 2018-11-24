import React, { Component } from "react";
import { ListGroup, ListGroupItem, Link } from "mdbreact";
import "./AdminDashboard.css";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSelector: ""
    };

  }

  render() {
    return (
      <div>
        <div className="left-box align-box">
          <h1>Opciones</h1>
          <ListGroup>
            <ListGroupItem hover>A</ListGroupItem>
            <ListGroupItem hover>B</ListGroupItem>
            <ListGroupItem hover>C</ListGroupItem>
            <ListGroupItem hover>D</ListGroupItem>
            <ListGroupItem hover>E</ListGroupItem>
          </ListGroup>
        </div>
        <div className="align-box">
          <h1>DIME QUIEN TE CONOCE PAPAH!</h1>
        </div>
      </div>
    );
  }
}

export default StudentDashboard;
