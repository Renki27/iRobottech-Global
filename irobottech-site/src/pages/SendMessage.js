import React, { Component } from 'react';
import { Container, Row, Col, Input, Button, Fa, Card, CardBody } from 'mdbreact';
import './Contact.css';
import { sendMessage } from "../components/recoverFunction";
import jwt_decode from "jwt-decode";


class SendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            nombre: "",
            email: "",
            asunto: "",
            mensaje: "",
        }
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit = event => {
        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);
        event.preventDefault(); //previene el metodo default de un objeto 
        const mensaje = {
            nombre: this.state.nombre,
            correo: decoded.email,
            asunto: this.state.asunto,
            mensaje: this.state.mensaje,
        };
        sendMessage(mensaje).then(res => {
            if (res) {

            }
        });
    };


    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    render() {
        return (
            <div>
                        <Row>
                            <Col className="mx-auto">
                                <Card>
                                    <CardBody>
                                        <form onSubmit={this.handleSubmit} noValidate>
                                            <p className="h5 text-center mb-4">Escribe en el mensaje lo que deseas</p>
                                            <div className="grey-text">
                                                <Input  name="nombre"  onChange={this.handleChange}
                                                    value={this.state.nombre} label="Tu nombre" icon="user" group type="text" validate error="wrong" success="right" />
                                        
                                                <Input  name="asunto" onChange={this.handleChange}
                                                    value={this.state.asunto} label="Asunto" icon="tag" group type="text" validate error="wrong" success="right" />
                                                <Input  name="mensaje" onChange={this.handleChange}
                                                    value={this.state.mensaje} type="textarea" rows="2" label="Tu mensaje" icon="pencil" />
                                            </div>
                                            <div className="text-center">
                                                <Button outline color="secondary" type="submit" >Enviar<Fa icon="paper-plane-o" className="ml-1" /></Button>
                                            </div>
                                        </form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>     
            </div>
        );
    }
}

export default SendMessage;