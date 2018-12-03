import React from 'react';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'mdbreact';
import axios from 'axios';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const state = {
  ST_GROUP_NUMBER: 0,
  PROF_ID_ACCOUNT: null,
  PROF_ID_PERSON: null,
  COURSE_NAME: null,
  AVAILABLE_QUOTA: null,
  professors: [{}],
  courses: [{}],
  category: 'Sin asignar',
  typeCount: null,
  buttonDisabled: false,
  days: [{ dia: "Lunes", inicio: "00:00", fin: "00:00" }
    , { dia: "Martes", inicio: "00:00", fin: "00:00" }
    , { dia: "Miércoles", inicio: "00:00", fin: "00:00" }
    , { dia: "Jueves", inicio: "00:00", fin: "00:00" }
    , { dia: "Viernes", inicio: "00:00", fin: "00:00" }
    , { dia: "Sábado", inicio: "00:00", fin: "00:00" }]
};

const selectRowProp = {
  mode: 'checkbox',
  bgColor: 'cyan',
  onSelect: onRowSelect,
  onSelectAll: onSelectAll,
};

const cellEditProp = {
  mode: 'click',
  blurToSave: true,
  beforeSaveCell: onBeforeSaveCell,
  afterSaveCell: onAfterSaveCell
};


function onAfterSaveCell(row, cellName, cellValue, rowIndex) {

  let rowStr = '';
  // For que recorre la fila seleccionada
  for (const prop in row) {
    rowStr += row[prop] + " ";
  }

  var res = rowStr.split(" ");
  if ((parseInt(res[2]) - parseInt(res[1])) <= 0 || (parseInt(res[2]) - parseInt(res[1])) == parseInt(res[2])) {
  } else {
    axios.put(`/RegisterSchedule/scheduleU/${(parseInt(res[2]) - parseInt(res[1]))}/${res[1]}/${res[2]}/${rowIndex}/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
      .then(response => {
      });
  }
}

function onBeforeSaveCell(row, cellName, cellValue) {

  return true;
}

function CourseType(tipo) {
  if (tipo === "Simple") {
    return state.typeCount = 1;
  } else if (tipo === "Doble") {
    return state.typeCount = 2;
  } else {
    return state.typeCount = 3;
  }
}


function onSelectAll(isSelected, rows) {
  this.setState({ selected: [] });
}


function onRowSelect(row, isSelected, e, rowIndex) {

  let rowStr = '';
  // For que recorre la fila seleccionada
  for (const prop in row) {
    rowStr += row[prop] + " ";
  }


  var res = rowStr.split(" ");
  rowIndex = rowIndex + 1;

  //Valida que no existan campos vacios
  if (state.COURSE_NAME === null || state.PROF_ID_PERSON === null || state.AVAILABLE_QUOTA === null) {
    alert("Tiene Campos vacios");
    this.setState({ selected: [] });
  } else {
    if (state.typeCount == 0) {

      if (!isSelected) {
        axios.delete(`/RegisterSchedule/scheduleD/${rowIndex}/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
          .then(response => {
          });
        state.days.some(function (json) {
          if (json.dia == res[0]) {
            state.typeCount = state.typeCount + 1;
            return json.inicio = "00:00", json.fin = "00:00";
          } else {
            return;
          }
        })
      } else {
        this.notify(e, "WARN", "La cantidad de dias esta completa");
        this.setState({ selected: [] });
      }
    } else {
      if ((parseInt(res[2]) - parseInt(res[1])) <= 0 || (parseInt(res[2]) - parseInt(res[1])) == parseInt(res[2])) {
        this.notify(e, "WARN", "Una de las horas esta mal");
        this.setState({ selected: [] });
      } else if (isSelected && (parseInt(res[2]) - parseInt(res[1])) > 0) {

        const stateSchudele = {
          DAY_NUMBER: rowIndex,
          ST_GROUP_NUMBER: state.ST_GROUP_NUMBER,
          COURSE_NAME: state.COURSE_NAME,
          ASSIGNED_DAY: res[0],
          ASSIGNED_HOURS: (parseInt(res[2]) - parseInt(res[1])),
          START_TIME: res[1],
          END_TIME: res[2]
        }

        fetch("/RegisterSchedule", {
          method: "POST",
          body: JSON.stringify(stateSchudele),

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }).then(res => res.json()).then(data => {
          console.log(data);
        })
          .catch(err => console.error(err));

      }

      state.typeCount = state.typeCount - 1;
    }

    if (!isSelected) {
      axios.delete(`/RegisterSchedule/scheduleD/${rowIndex}/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
        .then(response => {
        });
      state.days.some(function (json) {
        if (json.dia == res[0]) {
          state.typeCount = state.typeCount + 1;
          return json.inicio = "00:00", json.fin = "00:00";
        } else {
          return;
        }
      })
    }
  }
}

export class CreateGroup extends React.Component {

  handleBtnClick = () => {
    this.refs.nameCol.cleanSelected();
    axios.delete(`/RegisterGroup/groupD/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
      .then(response => {
      });
    document.getElementById("courseSelect").disabled = false;
    state.buttonDisabled = false;
    this.setState({ buttonDisabled: false });
    document.getElementById("schedule").style.display = "none";
    document.getElementById("btnAddCourse").style.display = "block";
    document.getElementById("btnChange").style.display = "none";
  }


  componentDidMount() {

    axios.get('/RegisterPerson')
      .then(response => {
        state.professors = response.data;
        this.setState({
          professors: response.data
        });
      });


    axios.get("/RegisterCourse").then(response => {
      state.courses = response.data;
      this.setState({
        courses: response.data
      });
      document.getElementById("schedule").style.display = "none";
      document.getElementById("btnChange").style.display = "none";

    });
  }

  professorSelect = this.professorSelect.bind(this);
  valueQuota = this.valueQuota.bind(this);
  courseSelect = this.courseSelect.bind(this);
  addGroup = this.addGroup.bind(this);

  addGroup(event) {

    if (state.COURSE_NAME != null && state.PROF_ID_PERSON != null && state.AVAILABLE_QUOTA != null) {

      const stateGroup = {
        ST_GROUP_NUMBER: state.ST_GROUP_NUMBER,
        PROF_ID_ACCOUNT: state.PROF_ID_ACCOUNT,
        PROF_ID_PERSON: state.PROF_ID_PERSON,
        COURSE_NAME: state.COURSE_NAME,
        AVAILABLE_QUOTA: state.AVAILABLE_QUOTA
      }

      fetch("/RegisterGroup", {
        method: "POST",
        body: JSON.stringify(stateGroup),

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => { res.json(); this.notify(event, "SUCCESS", "Se ha guarado!"); })
        .then(data => {
          console.log(data);
        })
        .catch(err => console.error(err));

      document.getElementById("courseSelect").disabled = true;
      state.buttonDisabled = true;
      this.setState({ buttonDisabled: true });
      document.getElementById("schedule").style.display = "block";
      document.getElementById("btnAddCourse").style.display = "none";
      document.getElementById("btnChange").style.display = "block";

    } else {
      alert("Faltan campos  que llenar")
    }
  }


  courseSelect(event) {
    state.COURSE_NAME = event.value;
    this.setState({ COURSE_NAME: event.value });

    state.days = [{ dia: "Lunes", inicio: "00:00", fin: "00:00" }
      , { dia: "Martes", inicio: "00:00", fin: "00:00" }
      , { dia: "Miércoles", inicio: "00:00", fin: "00:00" }
      , { dia: "Jueves", inicio: "00:00", fin: "00:00" }
      , { dia: "Viernes", inicio: "00:00", fin: "00:00" }
      , { dia: "Sábado", inicio: "00:00", fin: "00:00" }];


    axios.get(`/RegisterGroup/group/${state.COURSE_NAME}`)
      .then(response => {
        if (response.data > 0) {
          state.ST_GROUP_NUMBER = response.data + 1;
          this.setState({ ST_GROUP_NUMBER: response.data + 1 });
        }

      });
    state.ST_GROUP_NUMBER = state.ST_GROUP_NUMBER + 1;
    this.setState({ ST_GROUP_NUMBER: state.ST_GROUP_NUMBER + 1 });

    axios.get(`/RegisterCourse/course/${state.COURSE_NAME}`)
      .then(response => {
        CourseType(response.data.CATEGORY)
        state.category = response.data.CATEGORY;
        this.setState({ category: response.data.CATEGORY })
      });


  }

  professorSelect(event) {
    state.PROF_ID_PERSON = event.value;
    this.setState({ PROF_ID_PERSON: event.value });

    state.professors.some(function (json) {
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

    event.preventDefault();
  };

  notify = (evt, value, msj) => {
    switch (value) {
      case "SUCCESS":
        toast.success(msj);
        break;
      case "ERROR":
        toast.error(msj);
        break;
      case "WARN":
        toast.warn(msj);
        break;
      case "INFO":
        toast.info(msj);
        break;
      default:
        toast.info(msj);
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row className="mt-6">
          <Col md="10" className="ml-5">
            <Card style={{ width: "50rem" }}>
              <CardBody>
                <p className="h5 text-center mb-4">Crear Grupo</p>
                <label>Elija al profesor: </label>
                <Select onChange={this.professorSelect} options={state.professors.map(function (json) {
                  return { label: json.PROFESOR_NAME, value: json.ID_PERSON };
                })} />
                <br></br>
                <label>Elija el curso: </label>
                <Select id="courseSelect" isDisabled={state.buttonDisabled} onChange={this.courseSelect} options={state.courses.map(function (json) {
                  return { label: json.COURSE_NAME, value: json.COURSE_NAME };
                })} />
                <Button id="btnChange" onClick={this.handleBtnClick}>Cambiar Curso</Button>
                <br></br>
                <Input label="Cupo de grupo" name="AVAILABLE_QUOTA" type="text" value={state.AVAILABLE_QUOTA} onChange={this.valueQuota} />
                <br></br>
                <Button id="btnAddCourse" onClick={this.addGroup}>Asignar Horario</Button>
                <form onSubmit={this.handleSubmit} id="schedule">
                  <label>El curso seleccionado es de tipo: {state.category}</label>
                  <br></br>
                  <BootstrapTable ref='nameCol' data={state.days} selectRow={selectRowProp} cellEdit={cellEditProp}>
                    <TableHeaderColumn dataField='dia' isKey width="100">Día</TableHeaderColumn>
                    <TableHeaderColumn dataField='inicio' editable={{ type: 'time' }} width="100">Hora Inicio</TableHeaderColumn>
                    <TableHeaderColumn dataField='fin' editable={{ type: 'time' }} width="100">Hora Fin</TableHeaderColumn>
                  </BootstrapTable>
                  <div className="text-center">
                    <Button type="submit" color="primary" id="Register">Crear Curso</Button>
                    <ToastContainer
                      position="top-right"
                      autoClose={5000}
                      hideProgressBar
                      newestOnTop
                      closeOnClick
                      rtl={false}
                      pauseOnVisibilityChange
                      draggable
                      pauseOnHover
                    />
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateGroup;
