import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import style from '../../style/main.less'

const Logo = () => {
  return ( 

    <div className={`col-5 ${style.logo}`}>
        <ReactSVG src="./style/fonts/logo.svg"></ReactSVG>
    </div>

   );
}
 
export default Logo;