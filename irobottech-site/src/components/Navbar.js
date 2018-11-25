import React, { Component } from "react";
import "./Navbar.css";
import { Link, withRouter } from "react-router-dom";
import {
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Navbar
} from "mdbreact";
import DropdownPage from "./buttonDowload";

class MyNavbar extends Component {
  constructor(props) {
    super(props);
  }

  logOut = evt => {
    evt.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  };

  render() {
    const noUserAuth = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Iniciar Sesion
          </Link>
        </li>
      </ul>
    );

    const userAuth = (
      <ul className="navbar-nav ml-auto">
        <Link className="nav-link d-none d-md-inline" to="/profile">
          Mi Perfil
        </Link>

        <li className="nav-item">
          <Dropdown>
            <DropdownToggle nav caret>
              Mi Cuenta
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <Link className="nav-link d-none d-md-inline" to="/EditProfile">
                  Editar Datos
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link className="nav-link d-none d-md-inline" to="/EditPass">
                  Editar Contraseña
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link
                  to=""
                  className="nav-link d-none d-md-inline"
                  onClick={this.logOut.bind(this)}
                >
                  Cerrar Sesión
                </Link>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
      </ul>
    );

    return (
      <Navbar className="navbar navbar-expand elegant-color-dark">
        <button
          className="navbar-toggler navbar-toggler-right"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="container">
          <NavbarBrand href="/">
            <strong>iRobottech</strong>
          </NavbarBrand>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Home <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <DropdownPage />
              </li>
              {localStorage.usertoken ? userAuth : noUserAuth};
            </ul>
          </div>
        </div>
      </Navbar>
    );
  }
}

export default withRouter(MyNavbar);
