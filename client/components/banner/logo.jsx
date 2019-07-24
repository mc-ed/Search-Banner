import React, { Component } from 'react';
import ReactSVG from 'react-svg';
import style from '../../style/main.less';

const Logo = () => {
  return (
    <div
      className={`col-xl-4 col-lg-5 col-md-7 col-sm-7 col-6 ${style.logo}`}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent('product', {
            detail: { product_id: 0, browser_route: true }
          })
        )
      }
    >
      <ReactSVG src='/fonts/logo.svg' />
    </div>
  );
};

export default Logo;
