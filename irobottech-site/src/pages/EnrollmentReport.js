import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import axios from "axios";
import {
  ListGroup,
  ListGroupItem,
  Container,
  Row,
  Col,
  Card,
  CardBody
} from "mdbreact";

class EnrollmentReport extends Component {
  state = {
    inform: [{}]
  };

  componentDidMount() {
    const { myId } = this.props.match.params;
    var res = myId.replace(":", "");
    axios.get(`/users/inform/${res}`).then(response => {
      this.setState({
        inform: response.data
      });
    });
  }

  render() {
    return (
      <div>
        <Row className="mt-5">
          <Col  className="mx-auto">
            <Card>
              <CardBody>
                <hr />
                <header>
                  <h1>Informe de Matricula</h1>
                  <h2>iRobottech</h2>
                  <h6>Correo: centralirobottech@gmail.com</h6>
                  <h6>Telefonos: 83223222</h6> */}
                  <br />
                  <hr />
                  <BootstrapTable
                    data={this.state.inform}
                    columns={this.state.columns}
                  >
                    <TableHeaderColumn hidden
                      dataField="NOMBRE_ESTUDINTE"
                      isKey
                      width="50"
                    >
                      Alumno:{" "}
                    </TableHeaderColumn>
                  </BootstrapTable>
                  <h2>Nombre del Estudiante: {this.state.inform[0].NOMBRE_ESTUDINTE}</h2>
                  <hr />
                  <BootstrapTable
                    data={this.state.inform}
                    columns={this.state.columns}
                  >
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      isKey
                      width="100"
                    >
                      Nombre del Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="ST_GROUP_NUMBER" width="100">
                      Número de grupo
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="START_DATE" width="100">
                      Fecha de inicio{" "}
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="END_DATE" width="100">
                      Fecha de Fin
                    </TableHeaderColumn>
                    <TableHeaderColumn dataField="NUMBER_WEEKS" width="100">
                      Numero de Semanas Matriculadas
                    </TableHeaderColumn>
                  </BootstrapTable>
                  <br />
                  <br />
                  <div className="col">
                    <a color="white" href="javascript:window.print()">
                      IMPRIMIR
                    </a>
                  </div>
                </header>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EnrollmentReport;
