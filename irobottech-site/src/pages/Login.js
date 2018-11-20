import React, { Component } from "react";
import { Container, Row, Col, Input, Button, Card } from 'mdbreact';
import Navbar from '../components/Navbar.js';
import FooterPage from '../components/Footer.js';
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }


  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">

        <Navbar />
        <Container>
          <section className="form-dark">
            <Row>
              <Col md="5">
                <Card className="card-image" style={{ backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/pricing-table7.jpg)', width: '27rem' }}>
                  <div className="text-white rgba-stylish-strong py-5 px-5 z-depth-4">
                    <div className="text-center">
                      <h3 className="cyan-text mb-5 mt-4 font-weight-bold"><strong>Iniciar Sesión</strong></h3>
                    </div>
                    <Input label="Your email" group type="text" validate />
                    <Input label="Your password" group type="password" validate />
                    <Row className="d-flex align-items-center mb-4">
                      <div className="text-center mb-3 col-md-12">
                        <Button color="danger" rounded type="button" className="btn-block z-depth-1">Ingresar</Button>
                      </div>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
          </section>
        </Container>
        <FooterPage />

      </div>
    );
  }
}

export default Login;
