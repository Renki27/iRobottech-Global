import React, { Component } from 'react';
import jwt_decode from "jwt-decode";
import { editPass } from "../components/EditFunction";
import './Contact.css';

import { Container, Row, Col, Input, Button, Card, ToastContainer, toast, Fa, CardBody } from 'mdbreact';

class EditPass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            oldPass: "",
            newPass1: "",
            newPass2: "",
            id_person:""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = event => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        if (this.state.newPass1 != this.state.newPass2) {
            alert('Las nuevas contraseñas no coinciden')
        } else {
            if (this.state.oldPass != decoded.password) {
                alert('La antigua contraseña no coincide')
            } else {
                event.preventDefault(); //previene el metodo default de un objeto 
                const myPass = {
                    newPass1: this.state.newPass1,
                    id_person: decoded.id_person
                };
                editPass(myPass).then(res => {
                    if (res) {
                        this.props.history.push(`/`);
                    }
                });
            }
        }
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
                    toast.success('Success message', {
                        position: "top-right",
                    });
                    break;
                case 'warning':
                    toast.warn('Warning message');
                    break;
                case 'error':
                    toast.error('Error: Las contraseñas no coinciden');
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
                                            <p className="h5 text-center mb-4">Cambiar Contrasña</p>
                                            <div className="grey-text">
                                                <Input
                                                    name="oldPass"
                                                    label="Ingrese su antigua"
                                                    type="password"
                                                    onChange={this.handleChange}
                                                    value={this.state.oldPass}

                                                />
                                            </div>
                                            <div className="grey-text">
                                                <Input
                                                    name="newPass1"
                                                    label="Ingrese su Nueva Contraseña"
                                                    type="password"
                                                    onChange={this.handleChange}
                                                    value={this.state.newPass1}
                                                />
                                                <Input
                                                    name="newPass2"
                                                    label="Repita su Nueva Contraseña"
                                                    type="password"
                                                    onChange={this.handleChange}
                                                    value={this.state.newPass2}
                                                />
                                            </div>
                                            <div className="text-center">
                                                <Button outline color="secondary" type="submit">Modificar<Fa icon="paper-plane-o" className="ml-1" /></Button>
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
export default EditPass;
