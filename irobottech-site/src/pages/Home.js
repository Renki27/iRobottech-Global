import React, { Component } from "react";
import HomeCarousel from "../components/Carousel";
import "./Home.css";
import {
  Button,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardText,
  Row,
  Col,
  Fa
} from "mdbreact";

class Home extends Component {
  render() {
    return (
      <div>
        <HomeCarousel />
        <div className="container mt-5 mx-auto">
          <Row>
            <Col style={{ maxWidth: "22rem" }}>
              <Card>
                <CardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                  overlay="white-slight"
                  hover
                  waves
                  alt="Card image cap"
                />
                <CardBody>
                  <a
                    href="#!"
                    className="activator waves-effect waves-light mr-4"
                  >
                    <Fa icon="share-alt" />
                  </a>
                  <CardTitle>Card Title</CardTitle>
                  <hr />
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                  <a
                    href="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5>
                      Read more <Fa icon="angle-double-right" />
                    </h5>
                  </a>
                </CardBody>
              </Card>
            </Col>

            <Col style={{ maxWidth: "22rem" }}>
              <Card>
                <CardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                  overlay="white-slight"
                  hover
                  waves
                  alt="Card image cap"
                />
                <CardBody>
                  <a
                    href="#!"
                    className="activator waves-effect waves-light mr-4"
                  >
                    <Fa icon="share-alt" />
                  </a>
                  <CardTitle>Card Title</CardTitle>
                  <hr />
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                  <a
                    href="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5>
                      Read more <Fa icon="angle-double-right" />
                    </h5>
                  </a>
                </CardBody>
              </Card>
            </Col>
            <Col style={{ maxWidth: "22rem" }}>
              <Card>
                <CardImage
                  top
                  src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%28131%29.jpg"
                  overlay="white-slight"
                  hover
                  waves
                  alt="Card image cap"
                />
                <CardBody>
                  <a
                    href="#!"
                    className="activator waves-effect waves-light mr-4"
                  >
                    <Fa icon="share-alt" />
                  </a>
                  <CardTitle>Card Title</CardTitle>
                  <hr />
                  <CardText>
                    Some quick example text to build on the card title and make
                    up the bulk of the card&apos;s content.
                  </CardText>
                  <a
                    href="#!"
                    className="black-text d-flex justify-content-end"
                  >
                    <h5>
                      Read more <Fa icon="angle-double-right" />
                    </h5>
                  </a>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Home;
