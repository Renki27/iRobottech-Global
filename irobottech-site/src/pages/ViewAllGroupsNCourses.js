import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

class ViewAllGroupsNCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupsNCourses: [{}],
      myID: ""
    };
    this.getAllGroupsNCourses = this.getAllGroupsNCourses.bind(this);
  }

  componentDidMount() {
    this.getAllGroupsNCourses();
  }

  async getAllGroupsNCourses() {
    try {
      const response = await axios
        .get(`classesR/getAllGroupsNCourses`)
        .then(response => {
          this.state.groupsNCourses = response.data;
          this.setState({
            groupsNCourses: response.data
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
          <Col md="12" className="ml-5">
            <Card>
              <h3 className="text-center font-weight-bold pl-0 my-4">
                Datos de cursos y grupos
              </h3>
              <CardBody>
                <div>
                  <BootstrapTable
                    data={this.state.groupsNCourses}
                    search
                    multiColumnSearch={true}
                    ignoreSinglePage
                    width="150"
                  >
                    <TableHeaderColumn
                      dataField="USERNAME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Profesor
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="COUSE_CODE"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                     
                    >
                      Código de Curso
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
                      isKey
                    >
                      Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="CATEGORY"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Categoría
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
export default ViewAllGroupsNCourses;
