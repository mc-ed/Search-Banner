import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import style from '../../style/main.less'

const Logo = () => {
  return ( 

    <div className={`col-xl-4 col-lg-5 col-md-7 col-sm-7 col-6 ${style.logo}`}>
        <ReactSVG src="http://search-banner.us-east-1.elasticbeanstalk.com/fonts/logo.svg"></ReactSVG>
    </div>

   );
}
 
export default Logo; 