import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <Navbar bg="secondary" expand="lg">
            <Navbar.Brand >
                <Link to='/home'><span className="text-color"> Travel</span><span className="text-colors">Guru</span></Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Link className="nav-link active" aria-current="page" to="/"> <span className="text-color"> Home </span></Link>
                    <Link className="nav-link" to="/destination"> <span className="text-colors">Destination</span></Link>
                    <Link className="nav-link" to="/blog"><span className="text-color"> Blog </span> </Link>
                    <Link className="nav-link" to="/contact"> <span className="text-colors">Contact</span></Link>
                    <Link className="nav-link" to="/login"> <span className="text-color">Login</span></Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Header;