import React from 'react';
import { Container, Row, Col, Input, Button } from 'mdbreact';
import Select from 'react-select';
import jwt_decode from "jwt-decode";



const state = {
    CATEGORY: 0,
    COURSE_NAME: "",
    COUSE_CODE: "",
    STATUS: "Activo",
    ADM_ID_ACCOUNT: null,
    ADM_ID_PERSON: null,
    SEC_ID_ACCOUNT: null,
    SEC_ID_PERSON: null
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
            alert(decoded.id_account);
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
                        <form onSubmit={this.handleSubmit}>
                            <p className="h5 text-center mb-4">Crear Curso</p>
                            <div className="grey-text">

                                <Input label="Nombre del Curso" name="COURSE_NAME" type="text" value={state.COURSE_NAME} onChange={this.valueCourse} />
                                <Input label="Sigla del Curso" name="COUSE_CODE" type="text" value={state.COUSE_CODE} onChange={this.valueCategory} />
                                <label>Elija el tipo de curso: </label>
                                <Select options={this.CourseType} onChange={this.valueCourseType} />
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>
                            <div className="text-center">
                                <Button type="submit" color="primary" >Register</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container >
        );
    }

};

export default CreateCourse;