import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";

class StudentAttendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [{}]
    };
    // this.getClassesList = this.getClassesList.bind(this);
  }
  async getStudents() {
    try {
      const response = await axios
        .get(`users/getStudentsFromGroupAndCourse`)
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

  render() {
    return (
      <div>
        <Row className="mt-6">
          <Col md="10" className="ml-5">
            <Card>
              <h3 className="text-center font-weight-bold pl-0 my-4">
                Registro de estudiante
              </h3>
              <CardBody>
                <form className="needs-validation" onSubmit={this.handleSubmit}>
                  <label className="cyan-text">Datos personales:</label>
                  <div className="row">
                    <div className="col">
                      <Input
                        name="firstName"
                        label="Primer Nombre"
                        maxLength="25"
                        value={this.state.firstName}
                        onChange={this.handleInputChange}
                        className="form-control"
                        type="text"
                        required
                        errorText={this.state.firstNameError}
                      />
                    </div>
                    <div className="col">
                      <Input
                        name="secondName"
                        label="Segundo Nombre"
                        maxLength="25"
                        value={this.state.secondName}
                        onChange={this.handleInputChange}
                        className="form-control"
                        type="text"
                        required
                      />
                    </div>
                    <div className="col">
                      <Input
                        label="Primer Apellido"
                        name="lastName1"
                        maxLength="25"
                        value={this.state.lastName1}
                        onChange={this.handleInputChange}
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center py-4 mt-3">
                    <button
                      className="btn btn-outline-deep-orange"
                      type="submit"
                    >
                      Registrar
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default StudentAttendance;
