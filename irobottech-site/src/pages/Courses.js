import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Col } from 'mdbreact';
import { Container, Row } from "mdbreact";

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [{}],
        };
        this.createTable = this.createTable.bind(this)
    }

    componentDidMount() {
        axios.get("ShowAccounts/courses").then(response => {
            this.state.courses = response.data;
            this.setState({
                courses: response.data
            });
        });


        //  console.log(proffesors[0].NOMBRE_EMPLEADO) 
    }


    /*      createTable = () => {  
             let a = "";
            for (let i = 0; i < 3; i++) {
                a :{
                    <Col>
                    <Card style={{ width: "22rem" }}>
                      <CardImage
                        className="img-fluid"
                        src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                        waves
                      />
                      <CardBody>
                        <CardTitle>Hola</CardTitle>
                        <CardText>
                          Some quick example text to build on the card title and make
                          up the bulk of the card&apos;s content.
                        </CardText>
                        <Button href="#">Button</Button>
                      </CardBody>
                    </Card>
                  </Col>
    
                }
    /*              */
    /*         }
            return a
          }  */

    createTable = () => {
        let tempArray = []
        this.state.courses.forEach(function (each) {
            tempArray.push(

                <Card style={{ width: "22rem", marginRight:"auto", marginLeft:"auto", marginBottom: "35px"}
                
                }>
                    <CardImage
                        className="img-fluid"
                          src="https://i.ibb.co/vv0j3dD/logo-Verde.jpg"
                        waves
                    />
                    <CardBody>
                        <CardTitle>{each.COURSE_NAME} - {each.COUSE_CODE}</CardTitle>
                        <CardText>
                            {each.DESCRIPTION}
                        </CardText>
                    </CardBody>
                </Card>

            )
        })
        return tempArray

    }

    render() {



        return (
            <div>
                <Container className="mt-5">
                    <Row className="mt-6">
                        <Col md="8" className="mx-auto">
                            <Card>
                                <h3 className="text-center font-weight-bold pl-0 my-4">
                                    Contamos con diferentes cursos
                        </h3>
                                <CardBody>
                                    <div>
                                        <h4 className="text-center font-weight-bold pl-0 my-4">
                                            Cursos disponibles
                                  </h4>
                                        <div>{this.createTable()}</div>
                                        <br />
                                        <br />
                                    </div>

                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );


    }
}

export default Courses;