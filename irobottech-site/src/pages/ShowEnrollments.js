import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody, Input, Container } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import Select from "react-select";

class ShowEnrollments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailD: "",
      exist: false,
      id_person: "",
      person_data: "",
      open: false,
      firstName: "",
      secondName: "",
      lastName1: "",
      lastName2: "",
      idNumber: "",
      birthDate: "",
      phone: "",
      address: "",
      accounts: [{}],
      status: "", 
      enrollments: [{}]

    };
    this.accountSelect = this.accountSelect.bind(this);
  }

  componentDidMount() {
   document.getElementById("listaCursos").style.display = "none";
    axios.get("/ShowAccounts/students").then(response => {
      this.state.accounts = response.data;
      this.setState({
        accounts: response.data
      });
    });
  }


  async accountSelect(event) {
    document.getElementById("listaCursos").style.display = "block";
    this.state.id_person = event.value;
    this.setState({ id_person: event.value });
    axios.get(`/users/showEnrollmentFromStudent/${this.state.id_person}`).then(response => {
        this.state.enrollments = response.data;
        this.setState({
        enrollments: response.data
        });
      });
  }

  render() {
    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", // you should give a bgcolor, otherwise, you can't regonize which row has been selected
      hideSelectColumn: true, // enable hide selection column.
      clickToSelect: true // you should enable clickToSelect, otherwise, you can't select column.
      //onSelect: this.handleRowSelect
    };
    return (
      <div className="container">
        <Row>
          <Col className="mx-auto mt-5" >
            <Card style={{ width: "60rem" }}>
            <h3 className="text-center font-weight-bold pl-0 my-4">Mostrar Matriculas</h3>
              <CardBody>
                <label>Seleccione la cuenta </label>
                <Select styles="weight:300px"
                  onChange={this.accountSelect}
                  options={this.state.accounts.map(function (json) {
                    return {
                      label: json.username + "  -  " + json.email,
                      value: json.id_person
                    };
                  })}
                />
  
  <br></br>
  <br></br>
  <br></br>
                  <div id="listaCursos">
                   <BootstrapTable
                    data={this.state.enrollments}
                    // exportCSV={true}
                    selectRow={selectRowProp}
                    pagination
                  >
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      width="300"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn 
                      dataField="ST_GROUP_NUMBER"
                      width="300"
                      dataAlign="center"
                      headerAlign="center"
                    >
                     Numero de Grupo
                    </TableHeaderColumn>
                  </BootstrapTable> 
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>  
      </div>
    );
  }
}
export default ShowEnrollments;
