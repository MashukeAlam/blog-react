// src/Navbar.jsx
import React, { useState } from 'react';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavbarComponent = ({handleNewBlog}) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg="light" fixed="top" className="floating-navbar d-flex">
        <Navbar.Brand href="#home" style={{marginLeft: '10px'}}>Blog</Navbar.Brand>
        <div className='d-flex'>
          <Nav className="ml-auto">
            <Button variant="success" onClick={handleNewBlog}>+ New Blog</Button>
          </Nav>
          <Nav className="ml-auto" style={{marginLeft: '5px'}}>
            <Button variant="primary" onClick={handleShow}>
              Why Special?
            </Button>
          </Nav>
        </div>
      </Navbar>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Why This Blog is Special</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        This blog stands out because it operates uniquely without a traditional database. Instead of relying on conventional database systems, it leverages Discord messages for storage. Each blog post is captured and managed directly through Discord channels, making the integration seamless and innovative. This approach not only simplifies the architecture but also takes advantage of the existing Discord infrastructure, providing an unconventional yet effective method of content management.        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavbarComponent;
