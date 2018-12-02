import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody, Input } from "mdbreact";
import Select from "react-select";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { matricular } from "../components/matricularFunction";
import { Link, withRouter } from "react-router-dom";

class Enrollment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailId: "",
      exist: false,
      id_person: "",
      id_account: "",
      person_data: "",
      open: false,
      show: "true",
      COURSE_NAME: "",
      ST_GROUP_NUMBER: "",
      courses: [{}],
      groups: [{}],
      StartDate: "",
      EndDate: "",
      number_weeks: "",
      accounts: [{}],
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyAccount = this.verifyAccount.bind(this);
    this.courseSelect = this.courseSelect.bind(this);
    this.valueCourse = this.valueCourse.bind(this);
    this.valueGroup = this.valueGroup.bind(this);
    this.groupSelect = this.groupSelect.bind(this);
    this.matricular = this.matricular.bind(this);
    this.accountSelect = this.accountSelect.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  valueCourse(event) {
    this.state.COURSE_NAME = event.target.value;
    this.setState({ COURSE_NAME: event.target.value });
  }

  courseSelect(event) {
    this.state.COURSE_NAME = event.value;
    this.setState({ COURSE_NAME: event.value });
    axios
      .get(
        `http://localhost:8080/RegisterCourse/groups/${this.state.COURSE_NAME}`
      )
      .then(response => {
        this.state.groups = response.data;
        this.setState({
          groups: response.data
        });
      });
  }

  valueGroup(event) {
    this.state.ST_GROUP_NUMBER = event.target.value;
    this.setState({ GROUP_NAME: event.target.value });
  }

  groupSelect(event) {
    this.state.ST_GROUP_NUMBER = event.value;
    this.setState({ GROUP_NAME: event.value });
  }

  matricular = evt => {
    evt.preventDefault();
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    const account = {
      id_person: this.state.id_person,
      id_account: this.state.id_account,
      accountType: decoded.account_type,
      id_personUser: decoded.id_person,
      id_accountUser: decoded.id_account,
      accountType: decoded.account_type,
      curseName: this.state.COURSE_NAME,
      numberCurse: this.state.ST_GROUP_NUMBER,
      startDate: this.state.StartDate,
      endDate: this.state.EndDate,
      number_weeks: this.state.number_weeks
    };
    matricular(account).then(res => {
      if (res) {
        {
          /* <Redirect to={`/InformeMatricula:${this.state.id_person}`} />;*/
        }
        this.props.history.push(`/InformeMatricula:${this.state.id_person}`);
      }
    });
  };

  async accountSelect(event) {
    this.state.emailId = event.value;
    this.setState({ emailId: event.value });
    this.setState({ person_data: "" });
    try {
      const response = await axios.get(
        `users/verifyAllAccount/${this.state.emailId}`
      );
      if (response) {
        this.setState({ id_person: response.data.id_person });
        this.setState({ status: response.data.status });    
      }
    } catch (err) {
      console.error(err);
    }
    document.getElementById("Formulario").style.display = "block";
  }



  async verifyAccount() {
    try {
      const response = await axios.get(
        `users/verifyAccount/${this.state.emailId}`
      );
      if (response) {
        document.getElementById("Formulario").style.display = "block";
        document.getElementById("idEmail").disabled = true;
      }
      this.setState({ id_person: response.data.id_person });
      this.setState({ id_account: response.data.id_account });
      try {
        const response2 = await axios.get(
          `users/getPersonData/${this.state.id_person}`
        );
        this.setState({
          person_data:
            response2.data.first_name + " " + response2.data.last_name_1
        });
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  }

  componentDidMount() {
    axios.get("http://localhost:8080/ShowAccounts/students").then(response => {
      this.state.accounts = response.data;
      this.setState({
        accounts: response.data
      });
    });
    document.getElementById("Formulario").style.display = "none";
    axios.get("http://localhost:8080/RegisterCourse").then(response => {
      this.state.courses = response.data;
      this.setState({
        courses: response.data
      });
    });
  }

  

  handleChangeDate(event) {
    // this.state.EndDate = this.state.StartDate;
  //  this.state.EndDate = this.state.StartDate.getDate() + this.state.number_weeks;
   // this.state.EndDate.setDate(this.state.StartDate.getDate() + this.state.number_weeks);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
   
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Col className="mx-auto">
            <Card>
              <CardBody>
                <p className="h5 text-center mb-4">Matricula</p>


             <label>Elija la cuenta: </label>
                <Select
                  onChange={this.accountSelect}
                  options={this.state.accounts.map(function (json) {
                    return {
                      label: json.username + "  -  " + json.email,
                      value: json.email
                    };
                  })}
                />

{/*                 <div className="col">
                  <Input
                    id="idEmail"
                    label="Email"
                    name="emailId"
                    maxLength="30"
                    value={this.state.emailId}
                    onChange={this.handleChange}
                    hint="ejemplo@mail.com"
                    type="email"
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Dijite el email de la cuenta que desea matricular.
                  </small>
                </div>

                <div>
                  <Button
                    className="btn btn-outline-deep-orange"
                    onClick={this.verifyAccount}
                  >
                    Verificar
                  </Button>
                </div> */}
                <form onSubmit={this.matricular} id="Formulario" noValidate>
                  <div className="grey-text">
                    <br />
                    <br />
                    <label>Elija el curso: </label>
                    <Select
                      onChange={this.courseSelect}
                      options={this.state.courses.map(function(json) {
                        return {
                          label: json.COURSE_NAME,
                          value: json.COURSE_NAME
                        };
                      })}
                    />
                    <br />
                    <br />

                    <label>Elija el grupo: </label>
                    <Select
                      onChange={this.groupSelect}
                      options={this.state.groups.map(function(json) {
                        return {
                          label: json.ST_GROUP_NUMBER,
                          value: json.ST_GROUP_NUMBER
                        };
                      })}
                    />
                    <br />
                  </div>
                  <div>
                    <Input
                      label="Fecha de inicio"
                      name="StartDate"
                      value={this.state.StartDate}
                      onChange={this.handleChangeDate}
                      type="date"
                      hint="00/00/0000 "
                      required
                    />
                    <Input
                      label="Fecha de Fin"
                      name="EndDate"
                      value={this.state.EndDate}
                      onChange={this.handleChange}
                      type="date"
                      hint="00/00/0000 "
                      required
                    />

                    <Input
                      label="Cantidad de semanas"
                      name="number_weeks"
                      value={this.state.number_weeks}
                      onChange={this.handleChange}
                      type="text"
                      required
                    />
                  </div>
                  <div className="text-center">
                    <Button type="submit" color="primary">
                      Matricular
                    </Button>
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
export default withRouter(Enrollment);
