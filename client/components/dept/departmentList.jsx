import React, { Component } from 'react';
import DepartmentListEntry from './departmentListEntry.jsx';
import style from '../../style/main.less'

const DepartmentList = (props) => {
  return ( 
    <div className={`dropdown-menu ${style['category-wrapper']}`}>
        {props.deptList.map((department, i) => {
            return (
                <DepartmentListEntry
                  key={i} 

                  department={department} 
                  dataList={props.dataList}
                  categories={props.categoriesPerDept[i]}
                  sortedCategorySet={props.sortedCategorySet}
                  onMouseLeaveHandler={props.onMouseLeaveHandler} 
                  onMouseEnterHandler={props.onMouseEnterHandler}
                />
            )
          })} 
    </div>
   );
}
 
export default DepartmentList;