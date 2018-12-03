import React from 'react';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'mdbreact';
import Select from 'react-select';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const state = {
    CATEGORY: 0,
    COURSE_NAME: "",
    COUSE_CODE: "",
    STATUS: "",
    DESCRIPTION: "",
    courses: [{}]
};


export class CourseManage extends React.Component {

    componentDidMount() {

        axios.get("/RegisterCourse/all").then(response => {
            state.courses = response.data;
            this.setState({
                courses: response.data
            });
        });


        document.getElementById("btnDes").style.display = "none";
        document.getElementById("btnHab").style.display = "none";
    }

    CourseType = [
        { label: "Simple", value: "Simple" },
        { label: "Doble", value: "Doble" },
        { label: "Triple", value: "Triple" }
    ]

    valueCategory = this.valueCategory.bind(this);
    valueDescription = this.valueDescription.bind(this);
    courseSelect = this.courseSelect.bind(this);
    activeCourse = this.activeCourse.bind(this);
    inactiveCourse = this.inactiveCourse.bind(this);

    activeCourse(event) {
        document.getElementById("btnDes").style.display = "block";
        document.getElementById("btnHab").style.display = "none";

        axios.put(`/RegisterCourse/course/enableCourse/${state.COURSE_NAME}`)
            .then(response => {

            });

    }

    inactiveCourse(event) {
        document.getElementById("btnDes").style.display = "none";
        document.getElementById("btnHab").style.display = "block";
        axios.put(`/RegisterCourse/course/disableCourse/${state.COURSE_NAME}`)
            .then(response => {

            });

    }

    courseSelect(event) {

        state.COURSE_NAME = event.value;
        this.setState({ COURSE_NAME: event.value });

        axios.get(`/RegisterCourse/course/${state.COURSE_NAME}`)
            .then(response => {
                state.STATUS = response.data.STATUS;
                this.setState({ STATUS: response.data.STATUS })
                state.CATEGORY = response.data.CATEGORY;
                state.COURSE_NAME = response.data.COURSE_NAME;
                state.COUSE_CODE = response.data.COUSE_CODE;
                state.DESCRIPTION = response.data.DESCRIPTION;

                this.setState({ CATEGORY: response.data.CATEGORY })
                this.setState({ COURSE_NAME: response.data.COURSE_NAME })
                this.setState({ COUSE_CODE: response.data.COUSE_CODE })
                this.setState({ DESCRIPTION: response.data.DESCRIPTION })

            });


    }

    valueDescription(event) {
        state.DESCRIPTION = event.value;
        this.setState({ DESCRIPTION: event.value });
    }

    valueCategory(event) {
        state.COUSE_CODE = event.target.value;
        this.setState({ COUSE_CODE: event.target.value });

    }

    handleSubmit = event => {
        axios.put(`courseU/${state.COUSE_CODE}/${state.DESCRIPTION}/${state.COURSE_NAME}`)
            .then(response => {

            });

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
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h5 text-center mb-4">Modificar Curso</p>
                                    <div className="grey-text">
                                        <label>Elija el curso: </label>
                                        <Select id="courseSelect" onChange={this.courseSelect} options={state.courses.map(function (json) {
                                            return { label: json.COURSE_NAME, value: json.COURSE_NAME };
                                        })} />
                                        <Input label="Nombre del Curso" name="COURSE_NAME" type="text" value={state.COURSE_NAME} disabled />
                                        <Input label="Sigla del Curso" name="COUSE_CODE" type="text" value={state.COUSE_CODE} onChange={this.valueCategory} />
                                        <Input label="Tipo de Curso" name="COUSE_TYP" type="text" value={state.CATEGORY} disabled />
                                        <br></br>
                                        <Input label="Descripción del Curso" name="COUSE_DES" type="textarea" value={state.DESCRIPTION} onChange={this.valueDescription} />
                                        <br></br>
                                        <br></br>
                                        <Button id="btnHab" className="btn btn-outline-deep-orange" onClick={this.activeCourse}>
                                            Habilitar
                                        </Button>
                                        <Button id="btnDes" className="btn btn-outline-deep-orange" onClick={this.inactiveCourse}>
                                            Deshabilitar
                                        </Button>
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" color="primary" >Modificar Curso</Button>
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

export default CourseManage;