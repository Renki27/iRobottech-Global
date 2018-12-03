import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const jsonAttendanceList = [
  {
    ID_ACCOUNT: 4,
    ID_PERSON: 4,
    USERNAME: "José Rojas Rojas",
    NUMBER_CLASS: 1,
    ST_GROUP_NUMBER: 1,
    COURSE_NAME: "Engranes",
    ATTEND_CONFIRMATION: "Presente"
  },
  {
    ID_ACCOUNT: 5,
    ID_PERSON: 5,
    USERNAME: "George Washington ",
    NUMBER_CLASS: 1,
    ST_GROUP_NUMBER: 1,
    COURSE_NAME: "Engranes",
    ATTEND_CONFIRMATION: "Ausente"
  },
  {
    ID_ACCOUNT: 10,
    ID_PERSON: 10,
    USERNAME: "Bernardo Gomez Bolaños",
    NUMBER_CLASS: 1,
    ST_GROUP_NUMBER: 1,
    COURSE_NAME: "Engranes",
    ATTEND_CONFIRMATION: "Justificado"
  },
  {
    ID_ACCOUNT: 11,
    ID_PERSON: 11,
    USERNAME: "Will Smith ",
    NUMBER_CLASS: 1,
    ST_GROUP_NUMBER: 1,
    COURSE_NAME: "Engranes",
    ATTEND_CONFIRMATION: "Injustificado"
  }
];

class ViewClassAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [{}],
      groups: [{}],
      courseName: "",
      groupNumber: "",
      classes: [{}],
      myID: "",
      attendanceList: [{}]
    };
    // this.getMyClasses = this.getMyClasses.bind(this);
    this.loadCourses = this.loadCourses.bind(this);
    this.courseSelector = this.courseSelector.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setStudents = this.setStudents.bind(this);
    this.inputNumberValidator = this.inputNumberValidator.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state.myID = decoded.id_account;
    this.setState({
      myID: decoded.id_account
    });
    this.loadCourses();
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  /*
  async getMyClasses() {
    try {
      const response = await axios
        .get(`classesR/getMyClasses/${this.state.myID}`)
        .then(response => {
          this.state.classes = response.data;
          this.setState({
            classes: response.data
          });
        });
    } catch (err) {
      console.error(err);
    }
  }
*/
  loadCourses() {
    axios.get("/RegisterCourse").then(response => {
      this.state.courses = response.data;
      this.setState({
        courses: response.data
      });
    });
  }

  async courseSelector(event) {
    this.state.courseName = event.value;
    this.setState({ courseName: event.value });

    try {
      const response = await axios
        .get(`/RegisterCourse/groups/${this.state.courseName}`)
        .then(response => {
          this.state.groups = response.data;
          this.setState({ groups: response.data });
        });
    } catch (err) {
      console.error(err);
    }
  }

  groupSelect = evt => {
    this.state.groupNumber = evt.value;
    this.setState({ groupNumber: evt.value });
    //this.getLastClass();
    //this.getStudents();
    this.setStudents();
  };

  setStudents() {
    this.state.attendanceList = jsonAttendanceList;
    //this.setState({ attendanceList: evt.value });
  }
  inputNumberValidator(event) {
    const re = /^[0-9\b]+$/;
    const target = event.target;
    const value = target.value;
    const name = target.name;

    // if value is not blank, then test the regex

    if (value === "" || re.test(value)) {
      this.setState({
        [name]: value
      });
    }
  }
  render() {
    return (
      <div>
        <Row className="mt-6">
          <Col md="12" className="ml-5">
            <Card>
              <h3 className="text-center font-weight-bold pl-0 my-4">
                Asistencia
              </h3>
              <CardBody>
                <div className="row">
                  <div className="col">
                    <Input
                      label="Clase"
                      name="classNumber"
                      maxLength="25"
                      min="1"
                      max="100"
                      value={this.state.classNumber}
                      onChange={this.inputNumberValidator}
                      type="text"
                      required
                    />
                  </div>
                  <div className="col">
                    <label>Seleccione el curso</label>
                    <Select
                      onChange={this.courseSelector}
                      options={this.state.courses.map(function(json) {
                        return {
                          label: json.COURSE_NAME,
                          value: json.COURSE_NAME
                        };
                      })}
                    />
                  </div>

                  <div className="col">
                    <label>Seleccione el grupo</label>
                    <Select
                      onChange={this.groupSelect}
                      options={this.state.groups.map(function(json) {
                        return {
                          label: json.ST_GROUP_NUMBER,
                          value: json.ST_GROUP_NUMBER
                        };
                      })}
                    />
                  </div>
                </div>
                <div>
                  <BootstrapTable
                    data={this.state.attendanceList}
                    search
                    multiColumnSearch={true}
                    ignoreSinglePage
                    width="150"
                  >
                    <TableHeaderColumn
                      dataField="USERNAME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Estudiante
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="ATTEND_CONFIRMATION"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Asistencia
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ViewClassAttendance;
