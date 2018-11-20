import React, { Component } from "react";
import Navbar from "../components/Navbar.js";
import FooterPage from "../components/Footer.js";
import { Container, Row, Col, Card, CardBody, Input } from "mdbreact";

class RegisterSecretary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      secondName: "",
      lastName1: "",
      lastName2: "",
      idNumber: "",
      birthDate: "",
      phone: "",
      address: "",
      email: "",
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
    fetch("/RegisterSecretaryRoute", {
      method: "POST",
      body: JSON.stringify(this.state),

      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
    evt.preventDefault();
    // console.log(this.state);
  };

  render() {
    return (
      <div>
        <Navbar />
        <Container className="mt-5">
          <Row className="mt-6">
            <Col md="8" className="mx-auto">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Registro de Usuario Secretario
                </h3>
                <CardBody>
                  <form
                    className="needs-validation"
                    onSubmit={this.handleSubmit}
                    noValidate
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
        <FooterPage />
      </div>
    );
  }
}
export default RegisterSecretary;