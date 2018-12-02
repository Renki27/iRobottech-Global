import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

class ViewProfessorCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [{}],
      myID: ""
    };
    this.getMyCourses = this.getMyCourses.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state.myID = decoded.id_account;
    this.setState({
      myID: decoded.id_account
    });
    this.getMyCourses();
  }

  async getMyCourses() {
    try {
      const response = await axios
        .get(`classesR/getMyCourses/${this.state.myID}`)
        .then(response => {
          this.state.courses = response.data;
          this.setState({
            courses: response.data
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
                Mis Cursos
              </h3>
              <CardBody>
                <div>
                  <BootstrapTable
                    data={this.state.courses}
                    search
                    multiColumnSearch={true}
                    ignoreSinglePage
                    width="150"
                  >
                    <TableHeaderColumn
                      dataField="COUSE_CODE"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      Código de curso
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="COURSE_NAME"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Nombre de curso
                    </TableHeaderColumn>

                    <TableHeaderColumn
                      dataField="CATEGORY"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Categoría
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="STATUS"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Estado
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
export default ViewProfessorCourses;
