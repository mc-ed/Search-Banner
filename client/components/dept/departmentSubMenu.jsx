import React, { Component } from 'react';

const DepartmentSubMenu = (props) => {
  return ( 
    <div>
      <div className="dropdown-submenu-list">
        {props.category}
      </div>
      <div className="dropdown-submenu-list">
        {props.category}
      </div>
      <div className="dropdown-submenu-list">
        {props.category}
      </div>
      <div className="dropdown-submenu-list">
        {props.category}
      </div>
    </div>
   );
}
 
export default DepartmentSubMenu;