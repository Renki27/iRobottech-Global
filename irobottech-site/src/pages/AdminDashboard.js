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
import RegisterStudent from "./RegisterStudent";
import RegisterProfessor from "./RegisterProfessor";
import RegisterSecretary from "./RegisterSecretary";
import ManageAccount from "./ManageAccount";
import Enrollment from "./Enrollment";
import CreateCourse from "./CreateCourse";
import CreateGroup from "./CreateGroup";
import EnrollmentManage from "./EnrollmentManage";
import ShowEnrollments from "./ShowEnrollments";
import DownloadFile from "./DownloadFile";
import ViewAllGroupsNCourses from "./ViewAllGroupsNCourses";
import ClassList from "./ClassList";
const registerStudent = <RegisterStudent />;
const registerProfessor = <RegisterProfessor />;
const registerSecretary = <RegisterSecretary />;
const manageAccount = <ManageAccount />;
const enrollmentStudent = <Enrollment />;
const createCourse = <CreateCourse />;
const createGroup = <CreateGroup />;
const enrollmentManage = <EnrollmentManage />;
const showEnrollments = <ShowEnrollments />;
const downloadFile = <DownloadFile />;
const viewAllGroupsNCourses = <ViewAllGroupsNCourses />;
const viewAllClasses = <ClassList />;
import jwt_decode from "jwt-decode";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentSelector: ""
    };
    this.selector = this.selector.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.username
    });
  }
  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col md="4" className="mt-5">
            <Card>
              <h5 className="text-center font-weight-bold pl-0 my-4 deep-orange-text">
                Panel de Administrador
              </h5>
              <h6>{this.state.username}</h6>
              <CardBody>
                <div className="left-box align-box">
                  <ListGroup>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Registro
                    </label>
                    <ListGroupItem hover onClick={this.loaderRegStu.bind(this)}>
                      Estudiante
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.loaderRegProf.bind(this)}
                    >
                      Profesor
                    </ListGroupItem>
                    <ListGroupItem hover onClick={this.loaderRegSec.bind(this)}>
                      Secretario/a
                    </ListGroupItem>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Estudiante
                    </label>
                    <ListGroupItem hover onClick={this.enrollment.bind(this)}>
                      Matricular Estudiante
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.enrollmentManage.bind(this)}
                    >
                      Administrar Matriculas
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.showEnrollments.bind(this)}
                    >
                      Ver matriculas por Estudiante
                    </ListGroupItem>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Cursos
                    </label>
                    <ListGroupItem hover onClick={this.createCourse.bind(this)}>
                      Crear Curso
                    </ListGroupItem>
                    <ListGroupItem hover onClick={this.createGroup.bind(this)}>
                      Crear Grupo
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.getAllGroupsNCourses.bind(this)}
                    >
                      Ver Cursos y Grupos
                    </ListGroupItem>
                    <ListGroupItem
                      hover
                      onClick={this.getAllClasses.bind(this)}
                    >
                      Ver Clases
                    </ListGroupItem>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Cuenta
                    </label>

                    <ListGroupItem
                      hover
                      onClick={this.manageAccount.bind(this)}
                    >
                      Administrar Cuentas
                    </ListGroupItem>
                    <label className="mt-2 font-weight-bold deep-orange-text">
                      Archivos
                    </label>
                    <ListGroupItem hover onClick={this.downloadFile.bind(this)}>
                      Descargar/Cargar Curriculums
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
      case "R_STU":
        return registerStudent;
      case "R_PROF":
        return registerProfessor;
      case "R_SEC":
        return registerSecretary;
      case "MAN_ACC":
        return manageAccount;
      case "ENROLL":
        return enrollmentStudent;
      case "C_COURSE":
        return createCourse;
      case "C_GROUP":
        return createGroup;
      case "ENR_MAN":
        return enrollmentManage;
      case "SHO_ENR":
        return showEnrollments;
      case "DOW_FIL":
        return downloadFile;
      case "V_GNC":
        return viewAllGroupsNCourses;
      case "L_CLA":
        return viewAllClasses;
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
  manageAccount() {
    this.setState({ componentSelector: "MAN_ACC" });
  }
  enrollment() {
    this.setState({ componentSelector: "ENROLL" });
  }
  createCourse() {
    this.setState({ componentSelector: "C_COURSE" });
  }
  createGroup() {
    this.setState({ componentSelector: "C_GROUP" });
  }
  enrollmentManage() {
    this.setState({ componentSelector: "ENR_MAN" });
  }
  showEnrollments() {
    this.setState({ componentSelector: "SHO_ENR" });
  }
  downloadFile() {
    this.setState({ componentSelector: "DOW_FIL" });
  }
  getAllGroupsNCourses() {
    this.setState({ componentSelector: "V_GNC" });
  }
  getAllClasses() {
    this.setState({ componentSelector: "L_CLA" });
  }
}

export default AdminDashboard;
