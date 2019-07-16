import React, { Component } from 'react';
import Logo from './logo.jsx'
import style from '../../style/main.less';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';


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
            </div>
            <Modal dialogClassName={style.modalWidth} show={props.showCart} onHide={()=>props.cartModalToggler()} backdrop={"static"}>
                <Modal.Header closeButton >
                  <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body> 
                  {/* <div className={style.modalWrapper}>
                    <div className={`row ${style.cartRow} ${style['row-adjust']}`}>
                      <div className="col-md-auto">1</div>
                      <div className="col-md-auto"><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></div>
                      <div className="col-md-auto">Hammer</div>
                      <div className="col-md-auto"><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>{1}<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></div>
                      <div className="col-md-auto">$45.00</div>
                      <div className="col-md-auto">$45.00</div>
                    </div>
                    <div className={`row ${style.cartRow} ${style['row-adjust']}`}>hi</div>
                    <div className={`row ${style.cartRow} ${style['row-adjust']}`}>hi</div>
                    <div className={`row ${style.cartRow} ${style['row-adjust']}`}>hi</div>
                    <div className={`row ${style.cartRow} ${style['row-adjust']}`}>hi</div>
                  </div> */}
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
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                        <tr>
                          <td>1</td>
                          <td><img className={`${style['cartImg']}`} src={`https://fecdj.s3.amazonaws.com/photo/3.jpg`} alt=""/></td>
                          <td>HAMMER</td>
                          <td><button type="button" className="btn btn-outline-secondary btn-sm">{'<'}</button>1<button type="button" className="btn btn-outline-secondary btn-sm">{'>'}</button></td>
                          <td>$45.00</td>
                          <td>$45.00</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className={`${style.taxShippingWrapper}`}>
                    <div>
                      tax(8.00%):
                    </div>
                    <div>
                      shipping: 
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className={style.subtotal}>
                      Subtotal:
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