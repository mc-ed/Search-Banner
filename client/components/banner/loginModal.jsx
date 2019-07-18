import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import style from '../../style/main.less';

const LoginModal = (props) => {
  return ( 
    <Modal show={props.loginWindow} onHide={()=>props.loginWindowToggler()}>
      <Modal.Header closeButton >
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      
      <Modal.Body> 
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>props.loginWindowToggler()}>
          Close
        </Button>
        <Button variant="primary" onClick={()=>props.loginWindowToggler()}>
          Check Out
        </Button>
      </Modal.Footer>

    </Modal>
  );
}
 
export default LoginModal;