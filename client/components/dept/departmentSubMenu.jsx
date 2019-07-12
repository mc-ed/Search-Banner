import React, { Component } from 'react';
import style from '../../style/main.less'

const DepartmentSubMenu = (props) => {
  return ( 
    <ul className={`dropdown-menu ${style['dropdown-menu']}`}>
      <li><a href="#">Action</a></li>
      <li><a href="#">Action</a></li>
      <li><a href="#">Action</a></li>
      <li><a href="#">Action</a></li>
    </ul>
   );
}
 
export default DepartmentSubMenu;