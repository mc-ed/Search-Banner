import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import style from '../../style/main.less';

const LoginModal = (props) => {
  return ( 
    <Modal show={props.loginWindow} onHide={()=>props.loginWindowToggler()}>
      <Modal.Header closeButton >
        <Modal.Title>{props.signUpWindow ? 'Sign Up' : 'Sign in'}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body> 
        {props.signUpWindow ? 
         <Form>
         <Form.Group controlId="formBasicEmail">
           <Form.Label>Username</Form.Label>
           <Form.Control placeholder="Enter Username" value={props.username} onChange={(e) => props.handleUsername(e)}/>
           <Form.Text className="text-muted">
             We'll never share your email with anyone else.
           </Form.Text>
         </Form.Group>
       
         <Form.Group controlId="formBasicPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password" value={props.password} onChange={(e) => props.handlePassword(e)}/>
         </Form.Group>
         <Form.Group controlId="formBasicChecbox">
           <Form.Check type="checkbox" label="Check me out" />
         </Form.Group>
         <Button variant="success" type="submit" onClick={() => props.createAccount()}>
           Create Account
         </Button>
       </Form>
       :
       <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter Username" value={props.username} onChange={(e) => props.handleUsername(e)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={props.password} onChange={(e) => props.handlePassword(e)}/>
          </Form.Group>
          <Form.Group controlId="formBasicChecbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit" >
           Sign In
          </Button>
        </Form>
        }
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={()=>props.loginWindowToggler()}>
          Close
        </Button>
        {props.signUpWindow ? 
          <Button variant="danger" onClick={()=>props.signUpWindowToggler()}>
            Back
          </Button>  
          : 
          <Button variant="info" onClick={()=>props.signUpWindowToggler()}>
            Sign Up
          </Button>  
        }
        
      </Modal.Footer>

    </Modal>
  );
}
 
export default LoginModal;