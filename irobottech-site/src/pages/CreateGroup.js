import React from "react";
import { Container, Row, Col, Input, Button } from "mdbreact";
import axios from "axios";
import Select from "react-select";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";

const state = {
  ST_GROUP_NUMBER: 0,
  PROF_ID_ACCOUNT: null,
  PROF_ID_PERSON: null,
  COURSE_NAME: "",
  AVAILABLE_QUOTA: "",
  professors: [{}],
  courses: [{}],
  groups: [{}],
  diasSeleccionados: [null],
  cantidadTipo: 0,
  dias: [
    { dia: "Lunes", inicio: "00:00", fin: "00:00" },
    { dia: "Martes", inicio: "00:00", fin: "00:00" },
    { dia: "Miércoles", inicio: "00:00", fin: "00:00" },
    { dia: "Jueves", inicio: "00:00", fin: "00:00" },
    { dia: "Viernes", inicio: "00:00", fin: "00:00" },
    { dia: "Sábado", inicio: "00:00", fin: "00:00" }
  ]
};

const selectRowProp = {
  mode: "checkbox",
  bgColor: "pink",
  onSelect: onRowSelect
};

const cellEditProp = {
  mode: "click",
  blurToSave: true
};

function CourseType() {
  if (state.groups.CATEGORY == "Simple") {
    state.cantidadTipo = 1;
  } else if (state.groups.CATEGORY == "Doble") {
    state.cantidadTipo = 2;
  } else {
    state.cantidadTipo = 3;
  }
}

function onRowSelect(row, isSelected, e) {
  var count = 0;
  let rowStr = "";
  for (const prop in row) {
    rowStr += row[prop] + " ";

    var res = rowStr.split(" ");
    count = count + 1;
    alert(res[1]);
    const stateSchudele = {
      DAY_NUMBER: count,
      ST_GROUP_NUMBER: state.ST_GROUP_NUMBER,
      COURSE_NAME: state.COURSE_NAME,
      ASSIGNED_DAY: res[0],
      ASSIGNED_HOURS: parseInt(res[2]) - parseInt(res[1]),
      START_TIME: parseInt(res[1]),
      END_TIME: parseInt(res[2])
    };

    fetch("/RegisterSchedule", {
      method: "POST",
      body: JSON.stringify(stateSchudele),

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

    alert(`is selected: ${isSelected}, ${rowStr}`);
  }

  /**let rowStr = '';
  for (const prop in row) {
    alert(prop)
    rowStr += row[prop];
    break;
  }*/

  /**if (state.diasSeleccionados.length < state.cantidadTipo + 1) {
    state.diasSeleccionados.push(rowStr);
  } else {
    alert("tiene que ser menos de " + state.diasSeleccionados.length);
  }*/
}

export class CreateGroup extends React.Component {
  componentDidMount() {
    axios.get("http://localhost:8080/RegisterPerson").then(response => {
      state.professors = response.data;
      this.setState({
        professors: response.data
      });
    });

    axios.get("http://localhost:8080/RegisterCourse").then(response => {
      state.courses = response.data;
      this.setState({
        courses: response.data
      });
    });
  }

  professorSelect = this.professorSelect.bind(this);
  valueQuota = this.valueQuota.bind(this);
  courseSelect = this.courseSelect.bind(this);
  addSchedule = this.addSchedule.bind(this);

  addSchedule(event) {}

  courseSelect(event) {
    state.COURSE_NAME = event.value;
    this.setState({ COURSE_NAME: event.value });

    axios.get(`/RegisterGroup/group/${state.COURSE_NAME}`).then(response => {
      if (response.data > 0) {
        alert("Es más que 0");
        state.ST_GROUP_NUMBER = response.data;
        this.setState({ ST_GROUP_NUMBER: response.data });
      } else {
        alert("Es 0");
        state.ST_GROUP_NUMBER = 0;
        this.setState({ ST_GROUP_NUMBER: 0 });
      }
    });

    axios.get(`/RegisterCourse/course/${state.COURSE_NAME}`).then(response => {
      alert(response.data.CATEGORY);
      state.groups = response.data;
      this.setState({ groups: response.data });
    });
  }

  professorSelect(event) {
    state.PROF_ID_PERSON = event.value;
    this.setState({ PROF_ID_PERSON: event.value });

    state.professors.some(function(json) {
      if (state.PROF_ID_PERSON == json.ID_PERSON) {
        return (state.PROF_ID_ACCOUNT = json.ID_ACCOUNT);
      } else {
        return;
      }
    });
  }

  valueQuota(event) {
    state.AVAILABLE_QUOTA = event.target.value;
    this.setState({ AVAILABLE_QUOTA: event.target.value });
  }

  handleSubmit = event => {
    state.ST_GROUP_NUMBER = state.ST_GROUP_NUMBER + 1;
    this.setState({ ST_GROUP_NUMBER: state.ST_GROUP_NUMBER + 1 });

    const stateGroup = {
      ST_GROUP_NUMBER: state.ST_GROUP_NUMBER,
      PROF_ID_ACCOUNT: state.PROF_ID_ACCOUNT,
      PROF_ID_PERSON: state.PROF_ID_PERSON,
      COURSE_NAME: state.COURSE_NAME,
      AVAILABLE_QUOTA: state.AVAILABLE_QUOTA
    };

    fetch("/RegisterGroup", {
      method: "POST",
      body: JSON.stringify(stateGroup),

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
  };

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Crear Grupo</p>
              <div className="grey-text">
                <label>Elija al profesor: </label>
                <Select
                  onChange={this.professorSelect}
                  options={state.professors.map(function(json) {
                    return { label: json.PROFESOR_NAME, value: json.ID_PERSON };
                  })}
                />
                <br />
                <label>Elija el curso: </label>
                <Select
                  onChange={this.courseSelect}
                  options={state.courses.map(function(json) {
                    return { label: json.COURSE_NAME, value: json.COURSE_NAME };
                  })}
                />
                <Input
                  label="Cupo de grupo"
                  name="AVAILABLE_QUOTA"
                  type="text"
                  value={state.AVAILABLE_QUOTA}
                  onChange={this.valueQuota}
                />
                <br />
                <BootstrapTable
                  data={state.dias}
                  selectRow={selectRowProp}
                  cellEdit={cellEditProp}
                >
                  <TableHeaderColumn dataField="dia" isKey width="100">
                    Día
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="inicio"
                    editable={{ type: "time" }}
                    width="100"
                  >
                    Hora Inicio
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="fin"
                    editable={{ type: "time" }}
                    width="100"
                  >
                    Hora Fin
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="text-center">
                <Button type="submit" color="primary" id="Register">
                  Registrar Grupo
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateGroup;
