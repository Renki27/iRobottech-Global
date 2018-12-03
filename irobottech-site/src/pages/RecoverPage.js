import React, { Component } from 'react';
import { recover } from "../components/recoverFunction";
import './Contact.css';

import { Container, Row, Col, Input, Button, Card, ToastContainer, toast, Fa, CardBody } from 'mdbreact';

class RecoverPage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            email: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit = event => {
        event.preventDefault(); //previene el metodo default de un objeto 
        const account = {
            email: this.state.email,
          };
        recover(account).then(res => {
          if (res) {
            this.props.history.push(`/`);
          }
        });
      };


      handleChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };


    notify(type) {
        return () => {
            switch (type) {
                case 'info':
                    toast.info('Info message', {
                        autoClose: 3000
                    });
                    break;
                case 'success':
                    toast.success('Correo de recuperacion enviado', {
                        position: "top-right",
                    });
                    break;
                case 'warning':
                    toast.warn('Warning message');
                    break;
                case 'error':
                    toast.error('Error message');
                    break;
            }
        };
    };




    render() {
        return (
            <div>
                <div className="container-contact">
                    <Container>
                        <Row>
                            <Col md="6" className="mx-auto">
                                <Card>
                                    <CardBody>
                                        <form onSubmit={this.handleSubmit} noValidate>
                                            <p className="h5 text-center mb-4">Recuperacion de Contraseña</p>
                                            <div className="grey-text">
                                                <Input 
                                                name="email" 
                                                label="Ingrese su correo de recuperacion" 
                                                type="email"
                                                onChange={this.handleChange} 
                                                value={this.state.email} 
                                               
                                                
                                                />
                                            </div>
                                            <div className="text-center">
                                                <React.Fragment>
                                                    <Button outline color="secondary" onClick={this.notify('success')} type="submit">Enviar<Fa icon="paper-plane-o" className="ml-1" /></Button>
                                                    <ToastContainer
                                                        hideProgressBar={true}
                                                        newestOnTop={true}
                                                        autoClose={5000}
                                                    />
                                                </React.Fragment>
                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}

export default RecoverPage;
