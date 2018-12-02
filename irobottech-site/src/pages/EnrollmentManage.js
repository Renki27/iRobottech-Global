import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import Select from "react-select";
import "./global.css";

class EnrollmentManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [{}],
      courses: [{}],
      inform: [{}],
      groups: [{}],
      classNumber: "",
      courseName: "",
      groupNumber: "",
      NOMBRE_ESTUDINTE: "",
      ST_GROUP_NUMBER: "",
      START_DATE: "",
      END_DATE: "",
      NUMBER_WEEKS: "",
      RESERVATION_NUMBER: "",
      ID_PERSON: "",
      COURSE_NAME: ""
    };
    this.getStudents = this.getStudents.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.courseSelect = this.courseSelect.bind(this);
    this.cellButton = this.cellButton.bind(this);
    this.onClickAccounttSelected = this.onClickAccounttSelected.bind(this);
    this.eliminarMatricula = this.eliminarMatricula.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.editar = this.editar.bind(this);
    this.groupSelect = this.groupSelect.bind(this);
    //  this.llenarGrupos = this.llenarGrupos.bind(this)
    this.getDefaultValue = this.getDefaultValue.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  componentDidMount() {
    document.getElementById("listaEstudiantes").style.display = "none";
    document.getElementById("inform").style.display = "none";
    axios.get("http://localhost:8080/RegisterCourse").then(response => {
      this.state.courses = response.data;
      this.setState({
        courses: response.data
      });
    });
  }

  async courseSelect(event) {
    document.getElementById("listaEstudiantes").style.display = "block";
    this.state.courseName = event.value;
    this.setState({ courseName: event.value });
    try {
      const response = await axios
        .get(`users/getStudentsFromCourse/${this.state.courseName}`)
        .then(response => {
          this.state.students = response.data;
          this.setState({
            students: response.data
          });
        });
    } catch (err) {
      console.error(err);
    }
    try {
      await axios
        .get(
          `http://localhost:8080/RegisterCourse/groups/${this.state.courseName}`
        )
        .then(response => {
          this.state.groups = response.data;
          this.setState({
            groups: response.data
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  async getStudents() {
    try {
      const response = await axios
        .get(`users/getStudentsFromCourse/${this.state.courseName}`)
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

  async eliminarMatricula() {
    document.getElementById("inform").style.display = "none";
    axios.get(
      `/users/deleteInform/${this.state.inform[0].ID_PERSON}/${
        this.state.inform[0].COURSE_NAME
      }/${this.state.inform[0].RESERVATION_NUMBER}`
    );
    try {
      const response = await axios
        .get(`users/getStudentsFromCourse/${this.state.courseName}`)
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

  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  async onClickAccounttSelected(row) {
    document.getElementById("inform").style.display = "block";
    axios
      .get(`/users/Uniqueinform/${row.ID_PERSON}/${this.state.courseName}`)
      .then(response => {
        this.setState({
          inform: response.data
        });
        this.setState({
          NOMBRE_ESTUDINTE: this.state.inform[0].NOMBRE_ESTUDINTE,
          ST_GROUP_NUMBER: this.state.inform[0].ST_GROUP_NUMBER,
          START_DATE: this.state.inform[0].START_DATE,
          END_DATE: this.state.inform[0].END_DATE,
          NUMBER_WEEKS: this.state.inform[0].NUMBER_WEEKS,
          RESERVATION_NUMBER: this.state.inform[0].RESERVATION_NUMBER,
          COURSE_NAME: this.state.inform[0].COURSE_NAME,
          ID_PERSON: this.state.inform[0].ID_PERSON
        });
      });
  }

  getDefaultValue = evt => {
    return this.state.ST_GROUP_NUMBER;
  };

  groupSelect(event) {
    this.state.ST_GROUP_NUMBER = event.value;
    this.setState({ GROUP_NAME: event.value });
  }

  cellButton(cell, row, enumObject, rowIndex, data) {
    return (
      <button type="button" onClick={() => this.onClickAccounttSelected(row)}>
        Ver Detalles
      </button>
    );
  }

  editar() {
    axios.put(
      `/users/editInform/${this.state.ST_GROUP_NUMBER}/${
        this.state.START_DATE
      }/${this.state.END_DATE}/${this.state.NUMBER_WEEKS}/${
        this.state.RESERVATION_NUMBER
      }/${this.state.COURSE_NAME} /${this.state.ID_PERSON}`
    );
  }

  render() {
    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
      //onSelect: this.handleRowSelect
    };
    return (
      <div>
        <Row className="mt-6">
          <Col md="10" className="ml-5">
            <Card className="global-width">
              <h3 className="text-center font-weight-bold pl-0 my-4">Cursos</h3>
              <CardBody>
                <label>Elija el curso: </label>
                <Select
                  onChange={this.courseSelect}
                  options={this.state.courses.map(function(json) {
                    return {
                      label: json.COURSE_NAME + " - " + json.COUSE_CODE,
                      value: json.COURSE_NAME
                    };
                  })}
                />
                <div id="listaEstudiantes">
                  <BootstrapTable
                    data={this.state.students}
                    // exportCSV={true}
                    selectRow={selectRowProp}
                    pagination
                  >
                    <TableHeaderColumn
                      dataField="NOMBRE"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Nombre
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      hidden
                      dataField="ID_PERSON"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Id_Person
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      hidden
                      dataField="RESERVATION_NUMBER"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      RESERVATION_NUMBER
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="button"
                      dataFormat={this.cellButton}
                    >
                      Detalles
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <div id="inform">
          <Row className="mt-6">
            <Col md="8" className="mx-auto">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Detalles de la Matricula
                </h3>
                <CardBody>
                  <form className="needs-validation" noValidate>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Nombre Del Estudiante"
                          name="NOMBRE_ESTUDINTE"
                          maxLength="25"
                          value={this.state.NOMBRE_ESTUDINTE}
                          onChange={this.handleInputChange}
                          type="text"
                          required
                          disabled
                        />
                      </div>
                      <div className="col">
                        <h6>
                          Matriculado en el Grupo # {this.state.ST_GROUP_NUMBER}{" "}
                          Seleccione aca si desea cambiarlo
                        </h6>
                        <h6 />
                        <Select
                          //  default value ={this.getDefaultValue}
                          onChange={this.groupSelect}
                          options={this.state.groups.map(function(json) {
                            return {
                              label: json.ST_GROUP_NUMBER,
                              value: json.ST_GROUP_NUMBER
                            };
                          })}
                        />
                        {/*                      <Input
                          label="Numero de Grupo"
                          name="ST_GROUP_NUMBER"
                          maxLength="25"
                          value={this.state.ST_GROUP_NUMBER}
                          onChange={this.handleInputChange}
                          type="text"
                          required
                        /> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <Input
                          label="Inicio de la matricula"
                          name="START_DATE"
                          value={this.state.START_DATE}
                          onChange={this.handleInputChange}
                          type="date"
                          hint="00/00/0000"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          label="Fin de la matricula"
                          name="END_DATE"
                          value={this.state.END_DATE}
                          onChange={this.handleInputChange}
                          type="date"
                          hint="00/00/0000"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Numero de Semanas Matriculadas"
                          name="NUMBER_WEEKS"
                          maxLength="25"
                          value={this.state.NUMBER_WEEKS}
                          onChange={this.handleInputChange}
                          type="text"
                          required
                        />
                      </div>
                    </div>
                  </form>
                  <div className="text-center py-4 mt-3">
                    <button
                      className="btn btn-outline-deep-orange"
                      onClick={this.editar}
                    >
                      Editar
                    </button>
                  </div>
                  <button
                    className="btn btn-outline-deep-orange"
                    onClick={this.eliminarMatricula}
                  >
                    Eliminar
                  </button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default EnrollmentManage;
