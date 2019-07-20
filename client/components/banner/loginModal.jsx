import React from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import style from '../../style/main.less';

const LoginModal = (props) => {
  let favoriteArray =[]
  if(props.favoriteList) {
    for (const favoriteItemId in props.favoriteList) {
      favoriteArray.push(props.favoriteList[favoriteItemId]);
    }
  }
  console.log(favoriteArray);
  if(props.logoutWindow) {
    return (
    <Modal dialogClassName={style.modalWidth} show={props.loginWindow} onHide={()=>props.loginWindowToggler()}>
        <Modal.Header closeButton >
          <Modal.Title>{`${props.usernameShow}'s Saved Items`}</Modal.Title>
        </Modal.Header>
        
        <Modal.Body> 
        {
          props.loggingOut ? 
            <Spinner animation="border" variant="info" /> 
            : 
            <div className="table-responsive" >
              <table className="table table-hover">
                <thead>
                  <tr className="table-primary">
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">name</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteArray.map((item, i) => {
                    return (
                      <tr key = {i}>
                        <th scope="row">{i+1}</th>
                        <td colSpan="1"><img style={{width: '100px'}} src={`https://fecdj.s3.amazonaws.com/photo/${item.product_id}.jpg`}/></td>
                        <td colSpan="2">{item.name}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

            </div>

        }
        </Modal.Body>
  
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.loginWindowToggler()}>
            Close
          </Button>
          <Button variant="warning" onClick={()=>props.logOut()}>
            Sign Out
          </Button>  
          
        </Modal.Footer>
  
      </Modal>
    )
  } else { 
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
            {props.loggingIn ? 
            <Spinner animation="border" variant="info" /> 
            : 
            <React.Fragment>
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
              <Button variant="primary" onClick={() =>props.logIn()}>
              Sign In
              </Button>
            </React.Fragment>
            }
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
}
 
export default LoginModal;