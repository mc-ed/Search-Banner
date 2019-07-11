import React, { Component } from 'react';
import Logo from './logo.jsx'
import style from '../../style/main.less';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


const Banner = (props) => {
  return ( 
    
      <div className={`row ${style['row-adjust']}`}>
        <div className="col-6">
          <div className={`row ${style['row-adjust']}`}>
            <Logo />
            <div className={`col-4 ${style['column-adjust']} ${style['open-until']}`}>
              Open until 10PM !
              <div style={{'color': '#0471af'}}>
                Visit Lowe's Today!<a className={`${style['lowes-icon']}`}> {"\uEDBF"}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className={`row ${style['row-adjust']}`}>
            <div className="col-7"/>
            <div className={`col-3 ${style['destroy-padding']}`}>
              <div className={`row ${style['row-adjust']} ${style['user-cart']}`}>
                <div className={`col-6 ${style['usericon-wrapper']}`}>
                  <div className={`${style['destroy-padding']} ${style['lowes-icon']} ${style.usericon}`}>
                    {'\u0050'}
                  </div>
                </div>
                  <div className={`col-6 ${style['destroy-padding']} ${style['signin-wrapper']}`}>
                    <span>
                      my
                    </span>
                    <span className={`${style['bold-lowes']}`}>
                    {"lowes \n"}
                    </span>
                    <span className={`${style['signin-font']}`}>
                      Sign in
                    </span>
                  </div>
              </div>
            </div>
            <div className={`col-2 ${style['column-adjust']}`} onClick={()=>props.cartModalToggler()}>
              <div className={`row ${style['row-adjust']} ${style['user-cart']}`}>
                <div className={`col-6 ${style['destroy-padding']} ${style['carticon-wrapper']}`}>
                  <div className={`${style['destroy-padding']} ${style['lowes-icon']} ${style.usericon}`}>
                    {'\u007D'}
                  </div>
                </div>
                <div className={`col-6 ${style['column-adjust']} ${style['destroy-padding-left']} ${style['destroy-padding-right']} ${style['carticon-wrapper']}`}>
                  <div className={`${style['cart-item-number']}`}>
                    {props.cartNumItem}
                  </div>
                </div>
              </div>
              <Modal show={props.showCart} onHide={() => props.cartModalToggler()}>
                <Modal.Header closeButton>
                  <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => props.cartModalToggler()}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => props.cartModalToggler()}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    
   );
}
 
export default Banner;