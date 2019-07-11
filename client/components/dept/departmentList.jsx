import React, { Component } from 'react';
import DepartmentListEntry from './departmentListEntry.jsx';
import style from '../../style/main.less'

const DepartmentList = (props) => {
  return ( 
    <div className={style.moveleft} id="dept" aria-describedby="basic-addon1">
      <a className={style.department} >Departments</a>
      <ul className="dropdown-menu" role="menu" aria-labelledby="dept">
        {props.deptList.map((department, i) => {
            return <DepartmentListEntry
                    key={i} 
                    department={department} 
                    onMouseLeaveHandler={props.onMouseLeaveHandler} 
                    onMouseEnterHandler={props.onMouseEnterHandler}
                    category = {props.category}
                    />
          })} 
      </ul>
    </div>
   );
}
 
export default DepartmentList;