import React from 'react';
import style from '../../style/main.less';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Table } from 'react-bootstrap';

const CartModal = (props) => {
  let subTotal = 0;
  let shippingItems = 0;
  
  return ( 
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
                {shippingItems += cartItem.amount}
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
            shipping: {(shippingItems === 0 ? 0 : Number.parseInt(shippingItems/5) + 1.99).toLocaleString('en-EN', { style: 'currency', currency: 'USD' })}
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
  );
}
 
export default CartModal;