import React, { Component } from 'react';
import style from '../../style/main.less'

const DepartmentSubMenu = (props) => {
  return ( 
    <div>
      <div className={`${style['dropdown-submenu-list']}`}>
        {props.category}
      </div>
      <div className={`${style['dropdown-submenu-list']}`}>
        {props.category}
      </div>
      <div className={`${style['dropdown-submenu-list']}`}>
        {props.category}
      </div>
      <div className={`${style['dropdown-submenu-list']}`}>
        {props.category}
      </div>
    </div>
   );
}
 
export default DepartmentSubMenu;