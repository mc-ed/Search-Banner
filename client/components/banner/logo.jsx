import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import style from '../../style/main.less'

const Logo = () => {
  return ( 

<<<<<<< HEAD
    <div className={`col-5 ${style.logo}`}>
        <ReactSVG src="/fonts/logo.svg"></ReactSVG>
=======
    <div className={`col-xl-4 col-lg-5 col-md-7 col-sm-7 col-6 ${style.logo}`} onClick={() => window.dispatchEvent(new CustomEvent('product', {detail:{product_id: 0, browser_route: true}}))}>
        <ReactSVG src="http://search-banner.us-east-1.elasticbeanstalk.com/fonts/logo.svg"></ReactSVG>
>>>>>>> 1bf2c3a69888d70f5c1c31059832a36cd751dba2
    </div>

   );
}
 
export default Logo; 