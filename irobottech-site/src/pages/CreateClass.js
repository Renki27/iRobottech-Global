import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const state = ["Presente", "Ausente", "Justificado", "Injustificado"];

class CreateClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [{}],
      groups: [{}],
      courseName: "",
      groupNumber: "",
      lastClassN: 0,
      currentDate: "",
      currentTime: "",
      students: [{}],
      buttonDisabled: false
    };

    this.loadCourses = this.loadCourses.bind(this);
    this.courseSelector = this.courseSelector.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLastClass = this.getLastClass.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.notify = this.notify.bind(this);
    this.handleOnSelectAll = this.handleOnSelectAll.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    this.loadCourses();
    let today = new Date(),
      currentDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    this.setState({ currentDate });
    this.setState({ currentTime: new Date().toLocaleTimeString() });
  }

  getLastClass() {
    axios
      .get(
        `classesR/getClassNumber/${this.state.courseName}/${
          this.state.groupNumber
        }`
      )
      .then(response => {
        if (response != 0) {
          this.state.lastClassN = response.data;
          this.setState({
            lastClassN: response.data + 1
          });
        } else {
          this.setState({
            lastClassN: 1
          });
        }
      });
  }

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
    this.getLastClass();
    this.getStudents();
  };

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);

    if (isSelect) {
      this.setState(() => ({
        selected: ids
      }));
    } else {
      this.setState(() => ({
        selected: []
      }));
    }
  };

  async getStudents() {
    try {
      const response = await axios
        .get(
          `users/getStudentsFromGroupAndCourse/${this.state.groupNumber}/${
            this.state.courseName
          }`
        )
        .then(response => {
          this.state.students = response.data;
          this.setState({
            students: response.data
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  submitClass = evt => {
    evt.preventDefault();
    //si no está vacía
    try {
      if (this.state.lastClassN != 0) {
        axios
          .post(`/classesR/createClass`, {
            lastClassN: this.state.lastClassN,
            groupNumber: this.state.groupNumber,
            courseName: this.state.courseName,
            currentDate: this.state.currentDate,
            currentTime: this.state.currentTime
          })
          .then(response => {
            document.getElementById("createClassButton").disabled = true;
            this.setState({ buttonDisabled: true });
            this.notify(evt, "SUCCESS", "Se ha guarado la clase!");
          });

        //si está vacia
      } else if (this.state.lastClassN == 0) {
        this.notify(evt, "ERROR", "No se pueden guardar clases vacías!");
        //sino
      } else {
        this.notify(evt, "WARN", "Oops!, Ha sucedido algo inesperado!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  submitAttendance = evt => {
    evt.preventDefault();
    this.handleOnSelectAll;
  };

  //Notificaciones-----------------------------------------------------------------------------
  notify = (evt, value, msj) => {
    switch (value) {
      case "SUCCESS":
        toast.success(msj);
        break;
      case "ERROR":
        toast.error(msj);
        break;
      case "WARN":
        toast.warn(msj);
        break;
      case "INFO":
        toast.info(msj);
        break;
      default:
        toast.info(msj);
    }
  };
  //csvFileName={`Lista Clase: ${this.state.lastClassN} Curso: ${this.state.courseName} Grupo:${this.state.groupNumber} Fecha:${this.state.currentDate}`.csv}
  //----------------------------------------------------------------------------------------------
  render() {
    const selectRow = {
      mode: "checkbox",
      // bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      // hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true, // you should enable clickToSelect, otherwise, you can't select column.
      //onSelect: this.handleRowSelect
      onSelectAll: this.handleOnSelectAll
    };

    const cellEditProp = {
      mode: "click",
      blurToSave: true
    };

    const options = {
      exportCSVText: "Descargar documento"
    };

    return (
      <div>
        <div>
          <Row className="mt-6">
            <Col md="12" className="ml-5">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Crear Clase
                </h3>
                <CardBody>
                  <form
                    className="needs-validation"
                    onSubmit={this.submitClass}
                    noValidate
                  >
                    <div className="row">
                      <div className="col">
                        <label>Seleccione el curso</label>
                        <Select
                          onChange={this.courseSelector}
                          isDisabled={this.state.buttonDisabled}
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
                          isDisabled={this.state.buttonDisabled}
                          options={this.state.groups.map(function(json) {
                            return {
                              label: json.ST_GROUP_NUMBER,
                              value: json.ST_GROUP_NUMBER
                            };
                          })}
                        />
                      </div>
                    </div>
                    <div className="row mt-5">
                      <div className="col">
                        <label
                          value={this.state.lastClassN}
                          onChange={this.handleChange}
                        >
                          N° de clase: {this.state.lastClassN}
                        </label>
                      </div>
                      <div className="col">
                        <label
                          value={this.state.currentDate}
                          onChange={this.handleChange}
                        >
                          Fecha: {this.state.currentDate}
                        </label>
                      </div>
                      <div className="col">
                        <label
                          value={this.state.currentTime}
                          onChange={this.handleChange}
                        >
                          Hora: {this.state.currentTime}
                        </label>
                      </div>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <button
                        id="createClassButton"
                        className="btn btn-outline-deep-orange"
                        type="submit"
                      >
                        Guardar
                      </button>
                      <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar
                        newestOnTop
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                      />
                    </div>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Row className="mt-5">
            <Col md="12" className="ml-5">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Asistencia
                </h3>
                <CardBody>
                  <div className="row" />

                  <div>
                    <BootstrapTable
                      data={this.state.students}
                      options={options}
                      exportCSV={true}
                      selectRow={selectRow}
                      cellEdit={cellEditProp}
                      pagination
                      ignoreSinglePage
                    >
                      <TableHeaderColumn
                        dataField="ID_ACCOUNT"
                        width="100"
                        dataAlign="center"
                        headerAlign="center"
                        isKey
                        hidden
                        export={false}
                        editable={false}
                      >
                        Id
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ID_PERSON"
                        width="100"
                        dataAlign="center"
                        headerAlign="center"
                        hidden
                        export={false}
                        editable={false}
                      >
                        Id
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="USERNAME"
                        width="100"
                        dataAlign="center"
                        headerAlign="center"
                        csvHeader="Nombre"
                        editable={false}
                      >
                        Estudiante
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="COURSE_NAME"
                        width="100"
                        dataAlign="center"
                        headerAlign="center"
                        editable={false}
                        export={false}
                      >
                        Curso
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ST_GROUP_NUMBER"
                        width="100"
                        dataAlign="center"
                        headerAlign="center"
                        editable={false}
                        export={false}
                      >
                        Grupo
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="Attendance"
                        width="120"
                        csvHeader="Asistencia"
                        dataAlign="center"
                        headerAlign="center"
                        editable={{
                          type: "select",
                          options: { values: state }
                        }}
                      >
                        Asistencia
                      </TableHeaderColumn>
                    </BootstrapTable>
                    <div className="text-center py-4 mt-3">
                      <button
                        onClick={this.submitAttendance.bind(this)}
                        className="btn btn-outline-deep-orange"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default CreateClass;
