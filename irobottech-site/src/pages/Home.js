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

     
      </div>
    );
  }
}

export default Home;
