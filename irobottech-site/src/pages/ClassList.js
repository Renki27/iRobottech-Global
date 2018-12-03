import React, { Component } from "react";
import { Row, Col, Input, Button, Card, CardBody } from "mdbreact";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
//import "node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";
import axios from "axios";


class ClassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: [{}]
    };
    this.getClassesList = this.getClassesList.bind(this);
  }

  componentDidMount() {
    this.getClassesList();
    
  }

  async getClassesList() {
    try {
      const response = await axios.get(`users/getClasses`).then(response => {
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

    const selectRowProp = {
        mode: "radio",
        bgColor: 'pink', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
        hideSelectColumn: true,  // enable hide selection column.
        clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
        //onSelect: this.handleRowSelect
      };
      
    return (
      <div>
        <Row className="mt-6">
          <Col md="12" className="ml-5">
            <Card>
              <CardBody>
                <div>
                  <BootstrapTable
                    data={this.state.classes}
                    exportCSV={true}
                    selectRow={selectRowProp}
                    ignoreSinglePage
                    search
                    multiColumnSearch={true}
                  >
                    <TableHeaderColumn
                      dataField="number_class"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                      isKey
                    >
                      N°
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="st_group_number"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Grupo
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="course_name"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Curso
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="time"
                      width="100"
                      dataAlign="center"
                      headerAlign="center"
                    >
                      Hora de inicio
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="date"
                      width="100"
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
        <div />
      </div>
    );
  }
}

export default ClassList;
