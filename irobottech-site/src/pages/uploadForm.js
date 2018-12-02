import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody
} from "mdbreact";
import "./Contact.css";

class uploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }



  render() {
    return (

        <Container>
        <Row>
          <Col className="mx-auto mt-4">
            <Card>
              <CardBody>
              <body>
  <h1>Upload Form</h1>
  <form name="upload-form" action="upload" method="post" enctype="multipart/form-data">
    <input type="file" name="attachment" id="attachment"></input>
    <button type="submit">Send</button>
  </form>
</body>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default uploadForm;
