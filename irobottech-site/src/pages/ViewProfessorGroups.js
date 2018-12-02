import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

class ViewProfessorGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [{}],
      myID: ""
    };
    this.getMyGroups = this.getMyGroups.bind(this);
  }

  componentDidMount() {
    const token = localStorage.usertoken;
    const decoded = jwt_decode(token);
    this.state.myID = decoded.id_account;
    this.setState({
      myID: decoded.id_account
    });
    this.getMyGroups();
  }

  async getMyGroups() {
    try {
      const response = await axios
        .get(`classesR/getMyGroups/${this.state.myID}`)
        .then(response => {
          this.state.groups = response.data;
          this.setState({
            groups: response.data
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
                Mis grupos
              </h3>
              <CardBody>
                <div>
                  <BootstrapTable
                    data={this.state.groups}
                    search
                    multiColumnSearch={true}
                    ignoreSinglePage
                    width="150"
                  >
                    <TableHeaderColumn
                      dataField="ST_GROUP_NUMBER"
                      width="150"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
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
export default ViewProfessorGroups;
