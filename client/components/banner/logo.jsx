import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import style from '../../style/main.less'

const Logo = () => {
  return ( 

    <div className={`col-5 ${style.logo}`}>
        <ReactSVG src="http://search-banner.us-east-1.elasticbeanstalk.com/fonts/logo.svg"></ReactSVG>
    </div>

   );
}
 
export default Logo;