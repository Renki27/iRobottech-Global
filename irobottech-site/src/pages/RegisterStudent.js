import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, Input } from "mdbreact";
import { registerStudent } from "../components/UserFunctions";

class RegisterStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //fields
      firstName: "",
      secondName: "",
      lastName1: "",
      lastName2: "",
      idNumber: "",
      birthDate: "",
      phone: "",
      address: "",
      guardianName: "",
      guardianID: "",
      emergencyPhone: "",
      email: "",
      emailConfirm: "",
      //errors
      firstNameError: "",
      secondNameError: "",
      lastName1Error: "",
      lastName2Error: "",
      idNumberError: "",
      birthDateError: "",
      phoneError: "",
      addressError: "",
      guardianNameError: "",
      guardianIDError: "",
      emergencyPhoneError: "",
      emailError: "",
      emailConfirm: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputNumberValidator = this.inputNumberValidator.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    //  console.log(this.state);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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

  handleSubmit = evt => {
    evt.preventDefault();
    const newStudent = {
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      lastName1: this.state.lastName1,
      lastName2: this.state.lastName2,
      idNumber: this.state.idNumber,
      birthDate: this.state.birthDate,
      phone: this.state.phone,
      address: this.state.address,
      guardianName: this.state.guardianName,
      guardianID: this.state.guardianID,
      emergencyPhone: this.state.emergencyPhone,
      email: this.state.email
    };
    registerStudent(newStudent);

    // console.log(this.state);

    /*
    let emailOk = this.compareEmails(this.state.email, this.state.emailConfirm);
    if (emailOk === true) {
      alert("OK EMAIL");
    } else {
      alert("ERROR EMAIL");
    }
    */
  };

  compareEmails(email, emailConfirm) {
    if (emailConfirm === email) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <div>
        <Container className="mt-5">
          <Row className="mt-6">
            <Col md="10" className="ml-5">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Registro de estudiante
                </h3>
                <CardBody>
                  <form
                    className="needs-validation"
                    onSubmit={this.handleSubmit}
                  >
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
                      <div className="col">
                        <Input
                          label="Segundo Apellido"
                          name="lastName2"
                          maxLength="25"
                          value={this.state.lastName2}
                          onChange={this.handleInputChange}
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Cédula"
                          name="idNumber"
                          maxLength="25"
                          value={this.state.idNumber}
                          onChange={this.inputNumberValidator}
                          type="text"
                          required
                        />
                      </div>
                      <div className="col-6">
                        <Input
                          label="Fecha Nacimiento"
                          name="birthDate"
                          value={this.state.birthDate}
                          onChange={this.handleInputChange}
                          type="date"
                          hint="00/00/0000 "
                          required
                        />
                      </div>
                      <div className="col">
                        <Input
                          label="Teléfono"
                          name="phone"
                          maxLength="8"
                          value={this.state.phone}
                          onChange={this.inputNumberValidator}
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Dirección"
                          name="address"
                          value={this.state.address}
                          onChange={this.handleInputChange}
                          type="textarea"
                          hint="Dirección exacta"
                          rows="1"
                          maxLength="250"
                          required
                        />
                      </div>
                    </div>
                    <p className="cyan-text">Datos del encargado:</p>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Nombre Completo Encargado"
                          name="guardianName"
                          value={this.state.guardianName}
                          onChange={this.handleInputChange}
                          type="text"
                          maxLength="50"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Cédula de encargado"
                          name="guardianID"
                          maxLength="25"
                          value={this.state.guardianID}
                          onChange={this.inputNumberValidator}
                          type="text"
                          required
                        />
                      </div>
                      <div className="col">
                        <Input
                          label="Teléfono de encargado"
                          name="emergencyPhone"
                          maxLength="8"
                          value={this.state.emergencyPhone}
                          onChange={this.inputNumberValidator}
                          type="text"
                          required
                        />
                      </div>
                    </div>
                    <p className="cyan-text">Datos de la cuenta:</p>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Email"
                          name="email"
                          maxLength="30"
                          value={this.state.email}
                          onChange={this.handleInputChange}
                          hint="ejemplo@mail.com"
                          type="email"
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Input
                          label="Confirma Email"
                          name="emailConfirm"
                          maxLength="30"
                          onChange={this.handleInputChange}
                          hint="ejemplo@mail.com"
                          type="email"
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
        </Container>
      </div>
    );
  }
}
export default RegisterStudent;
