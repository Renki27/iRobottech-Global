import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Card,
  label,
  NavLink
} from "mdbreact";
import "./Login.css";
import { login } from "../components/UserFunctions";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account_type: "",
      email: "",
      password: "",
      accountT: [{}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAccountType = this.getAccountType.bind(this);
    this.notify = this.notify.bind(this);
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

  getAccountType() {
    axios.get(`users/getAccountType/${this.state.email}`).then(response => {
      if (response) {
        this.state.account_type = response.data;
        this.setState({
          account_type: response.data
        });
        alert(response.data);
      } else {
        alert(error);
      }
    });
  }

  handleSubmit = event => {
    event.preventDefault(); //previene el metodo default de un objeto
    axios.get(`users/getAccountType/${this.state.email}`).then(response => {
      if (response) {
        this.state.accountT = response.data;
        this.setState({
          account_type: this.state.accountT[0].ACCOUNT_TYPE
        });
        //  alert(response.data);

        const account = {
          account_type: this.state.account_type,
          email: this.state.email,
          password: this.state.password
        };
        login(account).then(res => {
          if (res) {
            this.notify(event, "SUCCESS", "Ha iniciado sesión!");
            this.props.history.push(`/profile`);
          }
        });
      } else {
        alert(error);
      }
    });
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
                    width: "27rem",
                    backgroundRepeat: "no-repeat",
                    backgroundSize:
                      "cover" /* Resize the background image to cover the entire container */
                  }}
                >
                  <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4 peach-gradient">
                    <div className="text-center">
                      <h3 className="red-text mb-5 mt-4 font-weight-bold">
                        <strong>Iniciar Sesión</strong>
                      </h3>
                    </div>
                    <form onSubmit={this.handleSubmit} noValidate>
                      <Input
                        name="email"
                        label="Email"
                        group
                        type="text"
                        validate
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                      <Input
                        name="password"
                        label="Contraseña"
                        group
                        type="password"
                        validate
                        value={this.state.password}
                        onChange={this.handleChange}
                      />
                      <Row className="d-flex align-items-center mb-4">
                        <div className="text-center col-md-12">
                          <Button
                            color="danger"
                            rounded
                            type="submit"
                            className="btn-block z-depth-1"
                          >
                            Ingresar
                          </Button>
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
                          <div className="mt-3">
                            <NavLink to="/RecoverPage">
                              Haz olvidado la contraseña?
                            </NavLink>
                          </div>
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
