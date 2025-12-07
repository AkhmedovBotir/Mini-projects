// import React from 'react'
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import "./style.css"

import logo from "../../img/Logo.png"

// export default function Navbars() {
//     return (
//         <>
//             <nav class="navbar navbar-expand-lg bg-body-tertiary" >
//                 <div class="container">
//                     <a class="navbar-brand" href="#">
//                         <img src={logo} />
//                     </a>
//                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//                         <span class="navbar-toggler-icon"></span>
//                     </button>
//                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
//                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
//                             <li class="nav-item">
//                                 <a class="nav-link active" aria-current="page" href="#">
//                                 </a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#">
//                                 </a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#">
//                                 </a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </nav>
//         </>
//     )
// }
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicExample() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={logo} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto text-right w-100 justify-content-end">
                        <Nav.Link>
                            <NavLink to="/" >Home</NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/work">Work</NavLink>
                        </Nav.Link>
                        <Nav.Link>
                            <NavLink to="/about">About</NavLink>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BasicExample;