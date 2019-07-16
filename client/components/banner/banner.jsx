import React, { Component } from 'react';
import Logo from './logo.jsx'
import style from '../../style/main.less';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';


const Banner = (props) => {
  let subTotal = 0;

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
                    {props.cartNumItemTotal}
                  </div>
                </div>
              </div>
            </div>
            <Modal dialogClassName={style.modalWidth} show={props.showCart} onHide={()=>props.cartModalToggler()} backdrop={"static"}>
                <Modal.Header closeButton >
                  <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
  
                  <div className={style.modalWrapper}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Name</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.cartItemList.map((cartItem, i) => {
                          {subTotal += cartItem.price*cartItem.amount}
                          return (
                            <tr key = {i}>
                              <td>{i+1}</td>
                              <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/${cartItem.id}.jpg`} alt=""/></td>
                              <td>{cartItem.name}</td>
                              <td className={style.allowWhiteSpace}><button value={i} type="button" className="btn btn-outline-secondary btn-sm" onClick={(e)=>props.removeItem(e.target.value)}>{'<'}</button>   {cartItem.amount}   <button value={i} type="button" className="btn btn-outline-secondary btn-sm" onClick={(e)=> props.addItem(e.target.value)}>{'>'}</button></td>
                              <td>{cartItem.price.toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}</td>
                              <td>{(cartItem.price*cartItem.amount).toLocaleString('en-EN', { style: 'currency', currency: 'USD' }) }</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>
                  <div className={`${style.taxShippingWrapper}`}>
                    <div>
                      tax(8.25%): {(subTotal*0.0825).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div>
                      shipping: {(1.99).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={style.subtotal}>
                      Subtotal: {(subTotal*1.0825 + 1.99).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}
                    </div>
                  <Button variant="secondary" onClick={()=>props.cartModalToggler()}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={()=>props.cartModalToggler()}>
                    Check Out
                  </Button>
                </Modal.Footer>
              </Modal>
          </div>
        </div>
      </div>
    
   );
}
 
export default Banner;