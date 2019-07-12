import React, { Component } from 'react';
import DepartmentListEntry from './departmentListEntry.jsx';
import style from '../../style/main.less'

const DepartmentList = (props) => {
  return ( 
    <div className={`${style['category-wrapper']}`}>
      <div className={`${style['dropdown-menu']}`}>
        {props.deptList.map((department, i) => {
            return <DepartmentListEntry
                    key={i} 
                    department={department} 
                    onMouseLeaveHandler={props.onMouseLeaveHandler} 
                    onMouseEnterHandler={props.onMouseEnterHandler}
                    category = {props.category}
                    />
          })} 
      </div>
    </div>
   );
}
 
export default DepartmentList;