import React from 'react';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'mdbreact';
import Select from 'react-select';
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const state = {
    CATEGORY: 0,
    COURSE_NAME: "",
    COUSE_CODE: "",
    STATUS: "ACTIVE",
    ADM_ID_ACCOUNT: null,
    ADM_ID_PERSON: null,
    SEC_ID_ACCOUNT: null,
    SEC_ID_PERSON: null,
    DESCRIPTION: "",
};


export class CreateCourse extends React.Component {


    CourseType = [
        { label: "Simple", value: "Simple" },
        { label: "Doble", value: "Doble" },
        { label: "Triple", value: "Triple" }
    ]

    valueCourseType = this.valueCourseType.bind(this);
    valueCourse = this.valueCourse.bind(this);
    valueCategory = this.valueCategory.bind(this);
    valueDescription = this.valueDescription.bind(this);

    valueDescription(event) {
        state.DESCRIPTION = event.target.value;
        this.setState({ DESCRIPTION: event.target.value });
    }

    valueCourseType(event) {
        state.CATEGORY = event.value;
        this.setState({ CATEGORY: event.value });
    }

    valueCourse(event) {
        state.COURSE_NAME = event.target.value;
        this.setState({ COURSE_NAME: event.target.value });
    }

    valueCategory(event) {
        state.COUSE_CODE = event.target.value;
        this.setState({ COUSE_CODE: event.target.value });


        const token = localStorage.usertoken;
        const decoded = jwt_decode(token);

        if (decoded.account_type == "ADMIN") {

            state.ADM_ID_ACCOUNT = decoded.id_account;
            this.setState({
                ADM_ID_ACCOUNT: decoded.id_account
            });
            state.ADM_ID_PERSON = decoded.id_person;
            this.setState({
                ADM_ID_PERSON: decoded.id_person
            });
        } else if (decoded.account_type == "SECRETARY") {
            state.SEC_ID_ACCOUNT = decoded.id_account;
            this.setState({
                SEC_ID_ACCOUNT: decoded.id_account
            });
            state.SEC_ID_PERSON = decoded.id_account;
            this.setState({
                SEC_ID_PERSON: decoded.id_person
            });
        }
    }

    handleSubmit = event => {

        fetch("/RegisterCourse", {
            method: "POST",
            body: JSON.stringify(state),

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                res.json();
                this.notify(event, "SUCCESS", "Se ha guarado el curso!");
            })
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
        this.myFormRef.reset();
        event.preventDefault();
    }

    notify = (evt, value, msj) => {
        switch (value) {
            case "SUCCESS":
                toast.success(msj);
                break;
            case "ERROR":
                toast.error(msj);
                break;
            case "WARN":
                toast.warn(msj);
                break;
            case "INFO":
                toast.info(msj);
                break;
            default:
                toast.info(msj);
        }
    };


    render() {

        return (
            <Container className="mt-5">
                <Row className="mt-6">
                    <Col md="10" className="ml-5">
                        <Card style={{ width: "50rem" }}>
                            <CardBody>
                                <form onSubmit={this.handleSubmit} id="create" ref={(el) => this.myFormRef = el}>
                                    <p className="h5 text-center mb-4">Crear Curso</p>
                                    <Input label="Nombre del Curso" name="COURSE_NAME" type="text" value={state.COURSE_NAME} onChange={this.valueCourse} />
                                    <Input label="Sigla del Curso" name="COUSE_CODE" type="text" value={state.COUSE_CODE} onChange={this.valueCategory} />
                                    <label>Elija el tipo de curso: </label>
                                    <Select options={this.CourseType} onChange={this.valueCourseType} />
                                    <br></br>
                                    <Input label="Descripción del Curso" name="COUSE_DES" type="textarea" value={state.DESCRIPTION} onChange={this.valueDescription} />
                                    <br></br>
                                    <br></br>
                                    <div className="text-center">
                                        <Button type="submit" color="primary" >Registrar Curso</Button>
                                        <ToastContainer
                                            position="top-right"
                                            autoClose={5000}
                                            hideProgressBar
                                            newestOnTop
                                            closeOnClick
                                            rtl={false}
                                            pauseOnVisibilityChange
                                            draggable
                                            pauseOnHover
                                        />
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container >
        );
    }
};

export default CreateCourse;