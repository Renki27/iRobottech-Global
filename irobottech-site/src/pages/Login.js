import React, { Component } from "react";
import { Container, Row, Col, Input, Button, Card, label } from "mdbreact";
import "./Login.css";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { login } from "../components/UserFunctions";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account_type: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault(); //previene el metodo default de un objeto

    const account = {
      account_type: this.state.account_type,
      email: this.state.email,
      password: this.state.password
    };
    login(account).then(res => {
      if (res) {
        this.props.history.push(`/profile`);
      }
    });
  };

  render() {
    return (
      <div className="Login">
        <Container>
          <section className="form-dark">
            <Row>
              <Col md="5">
                <Card
                  className="card-image"
                  style={{
                    backgroundImage:
                      "url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)",
                    width: "27rem"
                  }}
                >
                  <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                    <div className="text-center">
                      <h3 className="cyan-text mb-5 mt-4 font-weight-bold">
                        <strong>Iniciar Sesión</strong>
                      </h3>
                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
                      <FormControl required>
                        <label>Tipo de Cuenta</label>
                        <Select
                          name="account_type"
                          onChange={this.handleChange}
                          value={this.state.account_type}
                          errorText="sadasd"
                          inputProps={{
                            id: "acc-required"
                          }}
                        >
                          <MenuItem value={"ADMIN"}>Administrador</MenuItem>
                          <MenuItem value={"SECRETARY"}>Secretario/a</MenuItem>
                          <MenuItem value={"PROFESSOR"}>Profesor</MenuItem>
                          <MenuItem value={"STUDENT"}>Estudiante</MenuItem>
                        </Select>
                      </FormControl>
                      <Input
                        name="email"
                        label="Your email"
                        group
                        type="text"
                        validate
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <Input
                        name="password"
                        label="Your password"
                        group
                        type="password"
                        validate
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <Row className="d-flex align-items-center mb-4">
                        <div className="text-center mb-3 col-md-12">
                          <Button
                            color="danger"
                            rounded
                            type="submit"
                            className="btn-block z-depth-1"
                          >
                            Ingresar
                          </Button>
                        </div>
                      </Row>
                    </form>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
      </div>
    );
  }
}

export default Login;
