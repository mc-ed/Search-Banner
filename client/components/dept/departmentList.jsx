import React, { Component } from 'react';
import DepartmentListEntry from './departmentListEntry.jsx';

const DepartmentList = (props) => {
  return ( 
    <div className="moveleft" data-hover="dropdown" id="dept" aria-describedby="basic-addon1">
      <a className="department" >Departments</a>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dept">
        {props.deptList.map((department, i) => {
            return <DepartmentListEntry
                    key={i} 
                    department={department} 
                    onMouseLeaveHandler={props.onMouseLeaveHandler} 
                    onMouseEnterHandler={props.onMouseEnterHandler}
                    />
          })} 
      </ul>
    </div>
   );
}
 
export default DepartmentList;