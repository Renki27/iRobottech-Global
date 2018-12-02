import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

class ViewProfessorClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [{}],
      myID: ""
    };
    this.getMyClasses = this.getMyClasses.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state.myID = decoded.id_account;
    this.setState({
      myID: decoded.id_account
    });
    this.getMyClasses();
  }

  async getMyClasses() {
    try {
      const response = await axios
        .get(`classesR/getMyClasses/${this.state.myID}`)
        .then(response => {
          this.state.classes = response.data;
          this.setState({
            classes: response.data
          });
        });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div>
        <Row className="mt-6">
          <Col md="10" className="ml-5">
            <Card>
              <h3 className="text-center font-weight-bold pl-0 my-4">
                Mis clases
              </h3>
              <CardBody>
                <div>
                  <BootstrapTable
                    data={this.state.classes}
                    search
                    multiColumnSearch={true}
                    ignoreSinglePage
                    width="150"
                  >
                    <TableHeaderColumn
                      dataField="NUMBER_CLASS"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      N° de clase
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="ST_GROUP_NUMBER"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      N° de grupo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="TIME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Hora
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="DATE"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Fecha
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
export default ViewProfessorClasses;
