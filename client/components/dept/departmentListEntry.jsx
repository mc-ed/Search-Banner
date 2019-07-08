import React, { Component } from 'react';
import DepartmentSubMenu from './departmentSubMenu.jsx';

const DepartmentListEntry = (props) => {
  return ( 
    <div className="dept">
      <li className="dropdown-submenu"
          onMouseEnter={(e) => (props.onMouseEnterHandler(e))} 
          onMouseLeave={(e) => (props.onMouseLeaveHandler(e))}>
          {props.department}
      </li>
      {props.category === props.department ? 
            <DepartmentSubMenu category={props.category}/> 
            :
            null
          }
    </div>

   );
}
 
export default DepartmentListEntry;