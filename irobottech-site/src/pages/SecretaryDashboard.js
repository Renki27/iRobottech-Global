import React, { Component } from "react";
import { ListGroup, ListGroupItem, Link } from "mdbreact";
import "./AdminDashboard.css";
import RegisterStudent from "./RegisterStudent";
import RegisterProfessor from "./RegisterProfessor";
import RegisterSecretary from "./RegisterSecretary";

const registerStudent = <RegisterStudent />;
const registerProfessor = <RegisterProfessor />;
const registerSecretary = <RegisterSecretary />;

class SecretaryDashboard extends Component {
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
        <div className="left-box align-box">
          <h1>Opciones</h1>
          <ListGroup>
            <ListGroupItem hover onClick={this.loaderRegStu.bind(this)}>
              Registrar Estudiante
            </ListGroupItem>
            <ListGroupItem hover onClick={this.loaderRegProf.bind(this)}>
              Registrar Profesor
            </ListGroupItem>
            <ListGroupItem hover onClick={this.loaderRegSec.bind(this)}>
              Registrar Secretaria/o
            </ListGroupItem>
            <ListGroupItem hover>
              Crear Curso
            </ListGroupItem>
            <ListGroupItem hover>
              Crear Grupo
            </ListGroupItem>
          </ListGroup>
        </div>
        <div className="align-box">
          {this.selector(this.state.componentSelector)}
        </div>
      </div>
    );
  }

  selector(componentSelector) {
    switch (componentSelector) {
      case "R_STU":
        return registerStudent;
      case "R_PROF":
        return registerProfessor;
      case "R_SEC":
        return registerSecretary;
      default:
        return "";
    }
  }

  loaderRegStu() {
    this.setState({ componentSelector: "R_STU" });
  }
  loaderRegProf() {
    this.setState({ componentSelector: "R_PROF" });
  }
  loaderRegSec() {
    this.setState({ componentSelector: "R_SEC" });
  }
}

export default SecretaryDashboard;
