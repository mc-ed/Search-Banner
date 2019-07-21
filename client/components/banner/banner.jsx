import React, { Component } from 'react';
import Logo from './logo.jsx'
import style from '../../style/main.less';
import CartModal from './cartModal.jsx';
import LoginModal from './loginModal.jsx';


const Banner = (props) => {

  return ( 
    
      <div className={`row ${style['row-adjust']}`}>
        <div className="col-7 col-sm-6">
          <div className={`row ${style['row-adjust']}`}>
            <Logo />
            <div className={`col-xl-7 col-lg-7 col-md-5 col-sm-5 col-6 ${style['column-adjust']} ${style['open-until']}`}>
              Open until 10PM !
              <div style={{'color': '#0471af'}}>
                Visit Lowe's Today!<a className={`${style['lowes-icon']}`}> {"\uEDBF"}</a>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-5 col-sm-6 ${style.colTemp}`}>
          <div className={`row ${style['row-adjust']}`}>
            <div className={`col-xl-7 col-lg-6 col-md-3 col-sm-1 ${style.temp}`}/>
            <div className={`col-xl-3 col-lg-4 col-md-5 col-sm-6 col-6 ${style['destroy-padding']}`}>
              <div className={`row ${style['row-adjust']} ${style['user-cart']}`}>
                <div className={`col-4 col-md-6  ${style['usericon-wrapper']}`}>
                  <div className={`${style['destroy-padding']} ${style['lowes-icon']} ${style.usericon}`} onClick={()=>props.loginWindowToggler()}>
                    {'\u0050'}
                  </div>
                </div>
                  <div className={`col-8 col-md-6 ${style['destroy-padding']} ${style['signin-wrapper']}`}>
                    <span>
                      my
                    </span>
                    <span className={`${style['bold-lowes']}`}>
                    {"lowes \n"}
                    </span>
                    <span className={`${style['signin-font']}`} onClick={()=>props.loginWindowToggler()}>
                      {props.loggedIn ? props.usernameShow : 'Sign in'}
                    </span>
                  </div>
              </div>
            </div>
            <div className={`col-xl-2 col-lg-2 col-md-3 col-sm-4 col-4 ${style['column-adjust']}`} onClick={()=>props.cartModalToggler()}>
              <div className={`row ${style['row-adjust']} ${style['user-cart']}`}>
                <div className={`col-6 ${style['destroy-padding']} ${style['carticon-wrapper']}`}>
                  <div className={`${style.cartIcon} ${style['destroy-padding']} ${style['lowes-icon']} ${style.usericon}`}>
                    {'\u007D'}
                  </div>
                </div>
                <div className={`col-6 ${style.greyBox} ${style['column-adjust']} ${style['destroy-padding-left']} ${style['destroy-padding-right']} ${style['carticon-wrapper']}`}>
                  <div className={`${style['cart-item-number']}`}>
                    {props.cartNumItemTotal}
                  </div>
                </div>
              </div>
            </div>
            <CartModal {...props}/>
          </div>
        </div>
        <LoginModal {...props}/>
      </div>
    
   );
}
 
export default Banner;