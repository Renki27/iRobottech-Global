import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { Container, Row, Col, Card, CardBody, Input } from "mdbreact";
import { edit, fullEdit } from "../components/EditFunction";


class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      firstName: "",
      secondName: "",
      lastName1: "",
      lastName2: "",
      idNumber: "",
      birthDate: "",
      phone: "",
      address: "",
      email: "",
      id_person: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.inputNumberValidator = this.inputNumberValidator.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.Preloader = this.Preloader.bind(this);
    //  this.TokenDecoder = this.TokenDecoder.bind(this);

  }

  handleInputChange(event) {
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
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    event.preventDefault();
    const valuesToEdit = {
      firstName: this.state.firstName,
      secondName: this.state.secondName,
      lastName1: this.state.lastName1,
      lastName2: this.state.lastName2,
      idNumber: this.state.idNumber,
      birthDate: this.state.birthDate,
      phone: this.state.phone,
      address: this.state.address,
      id_person: decoded.id_person,
    };
    fullEdit(valuesToEdit).then(res => {
      if (res) {
        this.props.history.push(`/`);
      }
    });
  };

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.setState({
      username: decoded.username,
      email: decoded.email,
      account_type: decoded.account_type,
      id_person: decoded.id_person
    });
  }


  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    event.preventDefault();
    const token2 = {
      id_person: decoded.id_person,
    };
    edit(token2).then(res => {
      if (res) {
        this.setState({
          firstName: res[0].FirstNameJs,
          secondName: res[0].SecondNameJs,
          lastName1: res[0].lastName1Js,
          lastName2: res[0].lastName2Js,
          birthDate: res[0].birthDateJs,
          idNumber: res[0].identificationJs,
          address: res[0].addressJs,
          phone: res[0].phoneJs
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Container className="mt-5">
          <Row className="mt-6">
            <Col md="8" className="mx-auto">
              <Card>
                <h3 className="text-center font-weight-bold pl-0 my-4">
                  Editar Cuenta
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
                          label="Primer Nombre"
                          name="firstName"
                          maxLength="25"
                          value={this.state.firstName}
                          onChange={this.handleInputChange}
                          type="text"
                          required
                        />
                      </div>
                      <div className="col">
                        <Input
                          label="Segundo Apellido"
                          name="secondName"
                          maxLength="25"
                          value={this.state.secondName}
                          onChange={this.handleInputChange}
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
                          hint="00/00/0000"
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
                        <Input
                          name="email"
                          value={this.state.email}
                          type="hidden"
                        />
                      </div>
                    </div>
                    <div className="text-center py-4 mt-3">
                      <button
                        className="btn btn-outline-deep-orange"
                        type="submit" to="/profile">
                        Editar
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

export default EditProfile;