import React, { Component } from 'react';
import SubMenuCategory from './subMenuCategory.jsx';
import style from '../../style/main.less'



const DepartmentSubMenu = (props) => {
  return ( 
    <ul className={`dropdown-menu ${style['dropdown-menu']}`}>
      {props.categories.map((category, i) => {
        return (
            <SubMenuCategory key={i} category={category}/>
              );
      })}
    </ul>
   );
}
 
export default DepartmentSubMenu;