import React, { Component } from "react";
import "./Footer.css";
import { Col, Container, Row, Footer } from "mdbreact";
import { Link } from "react-router-dom";

class FooterPage extends Component {
  render() {
    return (
      <Footer color="elegant-color-dark" className="font-small pt-4">
        <Container fluid className="text-center text-md-left">
          <Row>
            <Col md="6">
              <h5 className="title">Enlaces</h5>
              <ul>
                <li className="list-unstyled">
                  <Link className="nav-link" to="/about">
                    Acerca de nosotros
                  </Link>
                </li>
                <li className="list-unstyled">
                <Link className="nav-link" to="/Contact">
                  Contáctanos
                </Link>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="https://www.iRobottech.com"> iRobottech.com </a>
          </Container>
        </div>
      </Footer>
    );
  }
}

export default FooterPage;
