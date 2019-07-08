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

      </div>
    
   );
}
 
export default Banner;