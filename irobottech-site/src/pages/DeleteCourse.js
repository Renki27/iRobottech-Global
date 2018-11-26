import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody, Input } from "mdbreact";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailD: "",
      exist: false,
      id_person: "",
      person_data: "",
      open: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.verifyAccount = this.verifyAccount.bind(this);
    this.disableAccount = this.disableAccount.bind(this);
    // this.loadIntoSelect = this.loadIntoSelect.bind(this);
    // this.accountSelector = this.accountSelector.bind(this);
  }
  /*
  componentDidMount() {
    this.loadIntoSelect;
  }*/

  async verifyAccount() {
    this.setState({ person_data: "" });
    try {
      const response = await axios.get(
        `users/verifyAccount/${this.state.emailD}`
      );
      this.setState({ id_person: response.data.id_person });
      try {
        const response2 = await axios.get(
          `users/getPersonData/${this.state.id_person}`
        );
        this.setState({
          person_data:
            response2.data.first_name + " " + response2.data.last_name_1
        });
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async disableAccount() {
    if (this.state.emailD.length > 0) {
      try {
        const response = await axios
          .put(`users/disableAccount/${this.state.emailD}`)
          .then(response => {
            if (response) {
              //this.props.history.push(`/profile`);
            }
          });
      } catch (err) {
        console.error(err);
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div className="container">
        <Row>
          <Col className="mx-auto">
            <Card>
              <CardBody>
                <p className="h5 text-center mb-4">Eliminar Curso</p>

                <div className="col">
                  <Input
                    label="Curso"
                    name="emailD"
                    maxLength="30"
                    value={this.state.emailD}
                    onChange={this.handleChange}
                    required
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Dijite el nombre del curso que desea eliminar.
                  </small>
                </div>

                <div>
                  <Button
                    className="btn btn-outline-deep-orange"
                    onClick={this.verifyAccount}
                  >
                    Verificar
                  </Button>
                  <Button
                    hidden={!this.state.person_data}
                    className="btn btn-outline-deep-orange"
                    onClick={this.handleClickOpen}
                  >
                    Eliminar
                  </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Desactivar Cuenta"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Está seguro que desea eliminar el curso: "{this.state.person_data} " ?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Cancelar
                      </Button>
                      <Button
                        onClick={() => {
                          this.disableAccount();
                          this.handleClose();
                        }}
                        color="primary"
                        autoFocus
                      >
                        Aceptar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default DeleteCourse;
