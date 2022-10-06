import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Cart from "./Cart";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/")
  };
  const tokenExist = () => {
    if (token === "") {
      navigate("/login");
    }
  };

  return (
    <>
      <Cart show={show} handleClose={handleClose} />

      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            <i className="fa-solid fa-grip-lines-vertical"></i>
            <span className="company-name">
              high
              <br />
              tech
            </span>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link to="/login" as={Link}>
              <i className="fa-solid fa-user"></i>
            </Nav.Link>
            <Nav.Link to="/purchases" onClick={tokenExist} as={Link}>
              <i className="fa-solid fa-bag-shopping"></i>
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                if(token !== ''){
                  handleShow();
                  tokenExist();
                } else {
                  handleClose();
                  tokenExist();
                }
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
            </Nav.Link>
            <Nav.Link onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
