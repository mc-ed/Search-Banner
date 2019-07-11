import React, { Component } from 'react';
import DepartmentListEntry from './departmentListEntry.jsx';
import style from '../../style/main.less'
import { Accordion } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const DepartmentList = (props) => {
  return ( 
    <div className={`${style['department-wrapper']}`} id="dept"  aria-describedby="basic-addon1">
      <a className={`${style.department} ${style['dropdown-toggle']} dropdown-toggle`} data-toggle="dropdown">Departments</a>
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