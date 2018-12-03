import React from 'react';
import { Container, Row, Col, Card, CardBody, Input, Button } from 'mdbreact';
import axios from 'axios';
import Select from 'react-select';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const state = {
  ST_GROUP_NUMBER: null,
  COURSE_NAME: null,
  AVAILABLE_QUOTA: null,
  courses: [{}],
  groups: [{}],
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
      alert("Se seleccionó el máximo posible de días")
      this.setState({ selected: [] });
    }
  } else {
    if ((parseInt(res[2]) - parseInt(res[1])) <= 0 || (parseInt(res[2]) - parseInt(res[1])) == parseInt(res[2])) {
      alert("Una de las horas no es correcta");
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


export class groupManager extends React.Component {

  handleBtnClick = () => {
    this.refs.nameCol.cleanSelected();

    document.getElementById("courseSelect").disabled = false;
    state.buttonDisabled = false;
    this.setState({ buttonDisabled: false });
    document.getElementById("schedule").style.display = "none";
    document.getElementById("btnAddCourse").style.display = "block";
    document.getElementById("btnChange").style.display = "none";
  }


  componentDidMount() {


    axios.get("/RegisterCourse").then(response => {
      state.courses = response.data;
      this.setState({
        courses: response.data
      });
    });





    document.getElementById("schedule").style.display = "none";
    document.getElementById("btnChange").style.display = "none";


  }

  valueQuota = this.valueQuota.bind(this);
  courseSelect = this.courseSelect.bind(this);
  numberCourse = this.numberCourse.bind(this);
  addGroup = this.addGroup.bind(this);

  addGroup(event) {

    document.getElementById("courseSelect").disabled = true;
    state.buttonDisabled = true;
    this.setState({ buttonDisabled: true });
    document.getElementById("schedule").style.display = "block";
    document.getElementById("btnAddCourse").style.display = "none";
    document.getElementById("btnChange").style.display = "block";
  }

  numberCourse(event) {
    state.ST_GROUP_NUMBER = event.value;
    this.setState({ ST_GROUP_NUMBER: event.value });

    axios.delete(`/RegisterSchedule/scheduleAll/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
      .then(response => {
      });
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


    axios.get(`/RegisterCourse/course/${state.COURSE_NAME}`)
      .then(response => {
        CourseType(response.data.CATEGORY)
        state.category = response.data.CATEGORY;
        this.setState({ category: response.data.CATEGORY })
      });

    axios.get(`/RegisterGroup/groupFind/${state.COURSE_NAME}`).then(response => {
      state.groups = response.data;
      state.AVAILABLE_QUOTA = response.data.AVAILABLE_QUOTA;
      this.setState({
        groups: response.data
      });
      this.setState({
        AVAILABLE_QUOTA: response.data.AVAILABLE_QUOTA
      });
    });
  }

  valueQuota(event) {
    state.AVAILABLE_QUOTA = event.target.value;
    this.setState({ AVAILABLE_QUOTA: event.target.value });
  }

  handleSubmit = event => {
    axios.put(`/RegisterGroup/groupU/${state.AVAILABLE_QUOTA}/${state.ST_GROUP_NUMBER}/${state.COURSE_NAME}`)
      .then(response => {
      });
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
                <p className="h5 text-center mb-4">Modificar Grupo</p>
                <div className="grey-text">
                  <br></br>
                  <label>Elija el curso: </label>
                  <Select id="courseSelect" isDisabled={state.buttonDisabled} onChange={this.courseSelect} options={state.courses.map(function (json) {
                    return { label: json.COURSE_NAME, value: json.COURSE_NAME };
                  })} />
                  <Button id="btnChange" onClick={this.handleBtnClick}>Cambiar Curso</Button>
                  <br></br>
                  <Select onChange={this.numberCourse} options={state.groups.map(function (json) {
                    return { label: json.ST_GROUP_NUMBER, value: json.ST_GROUP_NUMBER };
                  })} />
                  <Input label="Cupo de grupo" name="AVAILABLE_QUOTA" type="text" value={state.AVAILABLE_QUOTA} onChange={this.valueQuota} />
                  <br></br>
                </div>
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
                    <Button type="submit" color="primary" id="Register">Actualizar Curso</Button>
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

export default groupManager;
