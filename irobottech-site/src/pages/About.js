import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardBody, CardImage, CardTitle, CardText, Col } from 'mdbreact';
import { Container, Row } from "mdbreact";

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_selected: "",
            proffesors: [{}],
            secretarys: [{}]

        };
        this.onClickAccountSelectedSecretary = this.onClickAccountSelectedSecretary.bind(this);
        this.cellButtonSecretary = this.cellButtonSecretary.bind(this);
        this.onClickAccountSelectedProffesor = this.onClickAccountSelectedProffesor.bind(this);
        this.cellButtonProffesor = this.cellButtonProffesor.bind(this);
        this.createTable = this.createTable.bind(this)
    }

    componentDidMount() {
        axios.get("http://localhost:8080/ShowAccounts/proffesors").then(response => {
            this.state.proffesors = response.data;
            this.setState({
                proffesors: response.data
            });
        });

        axios.get("http://localhost:8080/ShowAccounts/secretary").then(response => {
            this.state.secretarys = response.data;
            this.setState({
                secretarys: response.data
            });
        });


    //  console.log(proffesors[0].NOMBRE_EMPLEADO) 
    }

    onClickAccountSelectedProffesor(cell, row, rowIndex){
        alert('Cuenta de profesor #'+ rowIndex +1 );
       }


    cellButtonProffesor(cell, row, enumObject, rowIndex) {
        return (
           <button 
              type="button" 
              onClick={() => 
              this.onClickAccountSelectedSecretary(cell, row, rowIndex)}
           >
           Descargar Curriculum { rowIndex }
           </button>
        )
     }

    onClickAccountSelectedSecretary(cell, row, rowIndex){
        alert('Cuenta #'+ rowIndex +1 );
       }


    cellButtonSecretary(cell, row, enumObject, rowIndex) {
        return (
           <button 
              type="button" 
              onClick={() => 
              this.onClickAccountSelectedSecretary(cell, row, rowIndex)}
           >
           Descargar Curriculum { rowIndex }
           </button>
        )
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
         this.state.proffesors.forEach(function(each){
           tempArray.push(
                <Col>
                <Card style={{ width: "22rem" }}>
                  <CardImage
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg"
                    waves
                  />
                  <CardBody>
                    <CardTitle>{each.NOMBRE_EMPLEADO}</CardTitle>
                    <CardText>
                    {each.PHONE_NUMBER}
                    </CardText>
                    <CardText>
                    {each.EMAIL}
                    </CardText>
                    <Button href="#">Descargar Curriculum</Button>
                  </CardBody>
                </Card>
              </Col>
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
                                Aca va la informacion Sobre la empresa
                        </h3>
                            <CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );

            
    }
}

export default About;