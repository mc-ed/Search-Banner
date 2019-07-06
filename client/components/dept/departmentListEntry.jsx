import React, { Component } from 'react';
import DepartmentSubMenu from './departmentSubMenu.jsx';

const DepartmentListEntry = (props) => {
  return ( 
    <div>
      <li className="dropdown-submenu"
          onMouseEnter={(e) => (props.onMouseEnterHandler(e))} 
          onMouseLeave={(e) => (props.onMouseLeaveHandler(e))}>
          {props.department}
      </li>
      <ul className="dropdown-submenu-list">
          <DepartmentSubMenu />
      </ul>
    </div>

   );
}
 
export default DepartmentListEntry;