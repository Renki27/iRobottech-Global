import React from 'react';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'mdbreact';
import Select from 'react-select';
import axios from 'axios';



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

        axios.get("/RegisterCourse").then(response => {
            state.courses = response.data;
            this.setState({
                courses: response.data
            });
        });
    }

    CourseType = [
        { label: "Simple", value: "Simple" },
        { label: "Doble", value: "Doble" },
        { label: "Triple", value: "Triple" }
    ]

    valueCourseType = this.valueCourseType.bind(this);
    valueCourse = this.valueCourse.bind(this);
    valueCategory = this.valueCategory.bind(this);
    valueDescription = this.valueDescription.bind(this);
    courseSelect = this.courseSelect.bind(this);
    activeCourse = this.activeCourse.bind(this);
    inactiveCourse = this.inactiveCourse.bind(this);

    activeCourse(event) {

    }

    inactiveCourse(event) {

    }

    courseSelect(event) {

        state.COURSE_NAME = event.value;
        this.setState({ COURSE_NAME: event.value });

        axios.get(`/RegisterCourse/course/${state.COURSE_NAME}`)
            .then(response => {
                state.CATEGORY = response.data.CATEGORY;
                state.COURSE_NAME = response.data.COURSE_NAME;
                state.COUSE_CODE = response.data.COUSE_CODE;
                state.DESCRIPTION = response.data.DESCRIPTION;
                state.STATUS = response.data.STATUS;
                this.setState({ CATEGORY: response.data.CATEGORY })
                this.setState({ COURSE_NAME: response.data.COURSE_NAME })
                this.setState({ COUSE_CODE: response.data.COUSE_CODE })
                this.setState({ DESCRIPTION: response.data.DESCRIPTION })
                this.setState({ STATUS: response.data.STATUS })
            });
    }

    valueDescription(event) {
        state.DESCRIPTION = event.value;
        this.setState({ DESCRIPTION: event.value });
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

    }

    handleSubmit = event => {

        fetch("/RegisterCourseU", {
            method: "PUT",
            body: JSON.stringify(state),

            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));

        event.preventDefault();
    }

    render() {

        return (
            < Container >
                <Row>
                    <Col>
                        <Card>
                            <CardBody>
                                <form onSubmit={this.handleSubmit}>
                                    <p className="h5 text-center mb-4">Crear Curso</p>
                                    <div className="grey-text">
                                        <label>Elija el curso: </label>
                                        <Select id="courseSelect" onChange={this.courseSelect} options={state.courses.map(function (json) {
                                            return { label: json.COURSE_NAME, value: json.COURSE_NAME };
                                        })} />
                                        <Input label="Nombre del Curso" name="COURSE_NAME" type="text" value={state.COURSE_NAME} onChange={this.valueCourse} disabled />
                                        <Input label="Sigla del Curso" name="COUSE_CODE" type="text" value={state.COUSE_CODE} onChange={this.valueCategory} />
                                        <label>Elija el tipo de curso: </label>
                                        <Input label="Tipo de Curso" name="COUSE_TYP" type="text" value={state.CATEGORY} disabled />
                                        <br></br>
                                        <Input label="Descripción del Curso" name="COUSE_DES" type="textarea" value={state.DESCRIPTION} onChange={this.valueDescription} />
                                        <br></br>
                                        <br></br>
                                        
                                    </div>
                                    <div className="text-center">
                                        <Button type="submit" color="primary" >Registrar Curso</Button>
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