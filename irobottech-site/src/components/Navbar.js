import React, { Component } from "react";
import "./Navbar.css";
import { Link, withRouter } from "react-router-dom";
import { NavbarBrand, DropdownToggle, DropdownMenu, DropdownItem, Dropdown} from "mdbreact";

class MyNavbar extends Component {
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
        <li className="nav-item">
          <Dropdown>
            <DropdownToggle nav caret>
              <Link className="nav-link d-none d-md-inline" to="/profile">
                Mi cuenta
          </Link>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="#!">Editar Datos</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </li>
        <li className="nav-item">
          <Link to="" className="nav-link" onClick={this.logOut.bind(this)}>
            Cerrar Sesion
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand elegant-color-dark">
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
                <Link className="nav-link" to="/RegisterStudent">
                  Acerca de nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contacto
                </Link>
              </li>
              {localStorage.usertoken ? userAuth : noUserAuth};
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(MyNavbar);
