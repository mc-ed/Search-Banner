import React, { Component } from 'react';
import ReactSVG from 'react-svg'
import style from '../../style/main.less'
import image from './logo.svg'

const Logo = () => {
  return ( 

    <div className={`col-5 ${style.logo}`}>
        {console.log('image:', image)}
        <ReactSVG src={image}></ReactSVG>
    </div>

   );
}
 
export default Logo;