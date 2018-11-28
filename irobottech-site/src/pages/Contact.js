import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Input,
  Button,
  Fa,
  Card,
  CardBody
} from "mdbreact";
import "./Contact.css";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col className="mx-auto mt-4">
            <Card>
              <CardBody>
                <h2 className="h1-responsive font-weight-bold text-center my-5">
                  Contactanos
                </h2>
                <Row>
                  <Col md="8" className="mx-auto">
                    <form>
                      <Row>
                        <Col md="6">
                          <div className="md-form mb-0">
                            <Input
                              type="text"
                              id="contact-name"
                              label="Nombre"
                            />
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="md-form mb-0">
                            <Input
                              type="text"
                              id="contact-email"
                              label="Email"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="md-form mb-0">
                            <Input
                              type="text"
                              id="contact-subject"
                              label="Asunto"
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <div className="md-form mb-0">
                            <Input
                              type="textarea"
                              id="contact-message"
                              label="Mensaje"
                            />
                          </div>
                        </Col>
                      </Row>
                    </form>
                    <div className="text-center text-md-left">
                      <Button color="primary" size="md">
                        Enviar
                      </Button>
                    </div>
                  </Col>
                  <Col md="3" className="text-center">
                    <ul className="list-unstyled mb-0 mt-4">
                      <li>
                        <Fa icon="map-marker" size="2x" className="blue-text" />
                        <p>Direccion</p>
                      </li>
                      <li>
                        <Fa icon="phone" size="2x" className="blue-text mt-4" />
                        <p>Telefono</p>
                      </li>
                      <li>
                        <Fa
                          icon="envelope"
                          size="2x"
                          className="blue-text mt-4"
                        />
                        <p>contact@example.com</p>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Contact;
