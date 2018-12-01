import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";

const cellEditProp = {
  mode: "click",
  blurToSave: true
};

const state = ["Presente", "Ausente", "Justificado", "Injustificado"]

class StudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [{}],
      classNumber: "",
      courseName: "",
      groupNumber: ""
    };
    this.getStudents = this.getStudents.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
            <Card>
              <h3 className="text-center font-weight-bold pl-0 my-4">
                Asistencia
              </h3>
              <CardBody>
                <label className="cyan-text">Datos de:</label>
                <div className="row">
                  <div className="col">
                    <Input
                      name="classNumber"
                      label="Número de clase"
                      maxLength="25"
                      value={this.state.classNumber}
                      onChange={this.handleChange}
                      className="form-control"
                      type="text"
                      required
                      errorText={this.state.firstNameError}
                    />
                  </div>
                  <div className="col">
                    <Input
                      name="courseName"
                      label="Nombre del curso"
                      maxLength="25"
                      value={this.state.courseName}
                      onChange={this.handleChange}
                      className="form-control"
                      type="text"
                      required
                    />
                  </div>
                  <div className="col">
                    <Input
                      label="Número de grupo"
                      name="groupNumber"
                      maxLength="25"
                      value={this.state.groupNumber}
                      onChange={this.handleChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="text-center py-4 mt-3">
                  <button
                    onClick={this.getStudents}
                    className="btn btn-outline-deep-orange"
                  >
                    Cargar
                  </button>
                </div>
                <div>
                  <BootstrapTable
                    data={this.state.students}
                    exportCSV={true}
                    selectRow={selectRowProp}
                    cellEdit={cellEditProp}
                    pagination
                  >
                    <TableHeaderColumn
                      dataField="ID_ACCOUNT"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                      hidden
                    >
                      Id
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="ID_PERSON"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                      hidden
                    >
                      Id
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="USERNAME"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Estudiante
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="ST_GROUP_NUMBER"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Grupo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      width="120"
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
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default StudentAttendance;
