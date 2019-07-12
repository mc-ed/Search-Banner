import React from 'react';
import DepartmentSubMenu from './departmentSubMenu.jsx';
import style from '../../style/main.less'

const DepartmentListEntry = (props) => {
  return ( 
      <li className={`dropdown-submenu ${style['dropdown-submenu']}`}
          onMouseEnter={() => (props.onMouseEnterHandler(props.department))} 
          onMouseLeave={() => (props.onMouseLeaveHandler(props.department))}>
          {props.department}
          <DepartmentSubMenu categories={props.categories}/> 
      </li>
   );
}
 
export default DepartmentListEntry;