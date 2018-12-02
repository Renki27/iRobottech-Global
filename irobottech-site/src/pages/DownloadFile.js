import React, { Component } from "react";
import { Row, Col, Button, Card, CardBody, Input, Container } from "mdbreact";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "mdbreact";
import axios from "axios";
import { edit, fullEdit } from "../components/EditFunction";
import Select from "react-select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadForm from './uploadForm';

const uploadForm = <UploadForm />;

class DownloadFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailD: "",
            exist: false,
            id_person: "",
            path: "",
            open: false,
            firstName: "",
            secondName: "",
            lastName1: "",
            lastName2: "",
            idNumber: "",
            birthDate: "",
            phone: "",
            address: "",
            accounts: [{}],
            status: ""
        };
        this.accountSelect = this.accountSelect.bind(this);
        this.load = this.load.bind(this)
        this.download = this.download.bind(this)
        // this.loadIntoSelect = this.loadIntoSelect.bind(this);
        // this.accountSelector = this.accountSelector.bind(this);
    }

    componentDidMount() {
        //  document.getElementById("Formulario").style.display = "none";
        axios.get("/ShowAccounts/personal").then(response => {
            this.state.accounts = response.data;
            this.setState({
                accounts: response.data
            });
        });
    }

    load() {

    }
    download() {
    axios.get(`download/Prueba.pdf`);
    }

    async accountSelect(event) {
        this.state.id_person = event.value;
        this.setState({ id_person: event.value });

        try {
            const response = await axios.get(
              `users/accountData/${this.state.id_person}`
            );
            if (response) {
              this.setState({ path: response.data.path });
            }
          } catch (err) {
            console.error(err);
          }

        //    document.getElementById("Formulario").style.display = "block";
    }

    render() {
        return (
            <div className="container">
                <Row>
                    <Col className="mx-auto mt-5" >
                        <Card >
                            <CardBody>
                                <p className="h5 text-center mb-4">Administrar Cuentas</p>

                                <label>Elija la cuenta: </label>
                                <Select
                                    onChange={this.accountSelect}
                                    options={this.state.accounts.map(function (json) {
                                        return {
                                            label: json.username + "  -  " + json.email,
                                            value: json.id_person
                                        };
                                    })}
                                />
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>
                                <div className="input-group">

                                    <div className="custom-file">
                                        <form name="upload-form" action="upload" method="post" enctype="multipart/form-data">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="inputGroupFile01"
                                                aria-describedby="inputGroupFileAddon01"
                                                name="attachment"
                                            />

                                            <input hidden
                                                aria-describedby="inputGroupFileAddon01"
                                                value={this.state.id_person}
                                                name="id_persona"
                                            />
                                            <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                Buscar Archivo
                                   </label>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                            <button type="submit">Cargar</button>
                                        </form>
                                    </div>
                                </div>
                                <div>
                                    <div id="123">
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                       
                                      {/*   <button onClick={this.download}>Descargar</button> */}
                                       <a href= {`/download/${this.state.path}`}>
                                            Descargar
                                            </a>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default DownloadFile;
