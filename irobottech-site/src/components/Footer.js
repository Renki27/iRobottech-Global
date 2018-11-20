import React, { Component } from "react";
import "./Footer.css";
import { Col, Container, Row, Footer } from "mdbreact";
import { Link } from "react-router-dom";

class FooterPage extends Component {
  render() {
    return (
      <Footer color="elegant-color-dark" className="font-small pt-4 mt-4">
        <Container fluid className="text-center text-md-left">
          <Row>
            <Col md="6">
              <h5 className="title">Footer Content</h5>
              <p>
                Here you can use rows and columns here to organize your footer
                content.
              </p>
            </Col>
            <Col md="6">
              <h5 className="title">Links</h5>
              <ul>
                <li className="list-unstyled">
                  <Link className="nav-link" to="/RegisterProfessor">
                    LINK 1
                  </Link>
                </li>
                <li className="list-unstyled">
                <Link className="nav-link" to="/RegisterAdmin">
                  LINK 2
                </Link>
                </li>
                <li className="list-unstyled">
                <Link className="nav-link" to="/RegisterSecretary">
                  LINK 3
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
