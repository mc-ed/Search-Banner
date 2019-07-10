import React, { Component } from 'react';
import Logo from './logo.jsx'
const Banner = (props) => {
  return ( 
    
      <div className="row row-adjust">
        <div className="col-6">
          <div className="row row-adjust">
            <Logo />
            <div className="col-4 column-adjust open-until">
              Open until 10PM !
              <div style={{'color': '#0471af'}}>
                Visit Lowe's Today!<a className="lowes-icon "> {"\uEDBF"}</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row row-adjust">
            <div className="col-7"/>
            <div className="col-3 destroy-padding">
              <div className="row row-adjust user-cart">
                <div className="col-6 usericon-wrapper">
                  <div className="destroy-padding lowes-icon usericon">
                    {'\u0050'}
                  </div>
                </div>
                  <div className="col-6 destroy-padding signin-wrapper">
                    <span>
                      my
                    </span>
                    <span className="bold-lowes">
                    {"lowes \n"}
                    </span>
                    <span className="signin-font">
                      Sign in
                    </span>
                  </div>
              </div>
            </div>
            <div className="col-2 column-adjust">
              <div className="row row-adjust user-cart">
                <div className="col-6 destroy-padding carticon-wrapper">
                  <div className="destroy-padding lowes-icon usericon">
                    {'\u007D'}
                  </div>
                </div>
                <div className="col-6 column-adjust destroy-padding-left destroy-padding-right carticon-wrapper">
                  <div className="cart-item-number">
                    0
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
   );
}
 
export default Banner;