import React, { Component } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';
import { NavbarBrand } from 'mdbreact';

class MyNavbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand elegant-color-dark">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="container">
                    <NavbarBrand href="/">
                        <strong>iRobottech</strong>
                    </NavbarBrand>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/RegisterStudent">Acerca de nosotros</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contacto</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        );
    }
}

export default MyNavbar;
