import React, { Component } from 'react';
import style from '../../style/main.less'

const DepartmentSubMenu = (props) => {
  return ( 
    <ul className={`dropdown-menu ${style['dropdown-menu']}`}>
      {props.categories.map((category, i) => {
        return <li key={i}><a href="#">{category}</a></li>
      })}
    </ul>
   );
}
 
export default DepartmentSubMenu;