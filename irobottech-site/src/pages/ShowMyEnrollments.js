import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody, Input, Container } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import jwt_decode from "jwt-decode";

class ShowMyEnrollments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_person: "",
      enrollments: [{}],
      schedule: [{}],
      nameCourse:"",
    };

    this.onClickCoursetSelected = this.onClickCoursetSelected.bind(this);
    this.cellButton = this.cellButton.bind(this);
  }

  componentDidMount() {
    document.getElementById("horario").style.display = "none";
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    axios.get(`users/showMyEnrollments/${decoded.id_person}`).then(response => {
        this.state.enrollments = response.data;
        this.setState({
        enrollments: response.data
        });
      });
  }

  onClickCoursetSelected(row) {
   document.getElementById("horario").style.display = "block";
  //  alert(row.ST_GROUP_NUMBER + " "  + row.COURSE_NAME)
     axios.get(`users/showMySchedule/${row.ST_GROUP_NUMBER}/${row.COURSE_NAME}`).then(response => {
      this.state.schedule = response.data;
      this.setState({
        schedule: response.data
      });

      this.state.nameCourse = row.COURSE_NAME;
      this.setState({
        nameCourse: row.COURSE_NAME
      });
    }); 
  }




  cellButton( cell, row, enumObject, rowIndex, data) {
    return (
      <button
        type="button"
        onClick={() =>
          this.onClickCoursetSelected(row)}
      >
        Ver Horario
       </button>
    )
  }


  render() {
    const selectRowProp = {
      mode: "radio",
      bgColor: "pink", 
      hideSelectColumn: true,
      clickToSelect: true 
    };
    return (
      <div className="container">
        <Row>
          <Col className="mx-auto mt-5" >
            <Card >
              <CardBody>
              <h3>Mis Matriculas</h3>
                  <div id="listaCursos">
                   <BootstrapTable
                    data={this.state.enrollments}
                    // exportCSV={true}
                    selectRow={selectRowProp}
                    pagination
                  >
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Curso
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="ST_GROUP_NUMBER"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Numero de Grupo
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      dataField="START_DATE"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                     Fecha de inicio
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      dataField="END_DATE"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                     Fecha de fin
                    </TableHeaderColumn>
                       <TableHeaderColumn
                      dataField='button'
                      width="200"
                      dataAlign="center"
                      headerAlign="center"
                      dataFormat={this.cellButton}
                    >Horario</TableHeaderColumn>
                  </BootstrapTable> 
                </div>

 <br></br>
  
                  <div id="horario">
                  <h4>Horario de {this.state.nameCourse}</h4>
                   <BootstrapTable
                    data={this.state.schedule}
                    // exportCSV={true}
                    selectRow={selectRowProp}
                   // pagination
                  >
                    <TableHeaderColumn
                      dataField="ASSIGNED_DAY"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Dia
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="ASSIGNED_HOURS"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Cantidad de horas
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      dataField="START_TIME"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                     Hora de inicio
                    </TableHeaderColumn>
                    <TableHeaderColumn 
                      dataField="END_TIME"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                     Hora de fin
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
export default ShowMyEnrollments;
