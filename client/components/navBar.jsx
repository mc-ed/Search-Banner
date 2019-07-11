import React, { Component } from 'react';
import SearchBar from './searchBar.jsx';
import Departments from './dept/departments.jsx';
import style from '../style/main.less'

const Navbar = (props) => {
  return ( 
  <div className={style.navbar}>
    <div className={`container`}>
      <div className={`row ${style['row-adjust']}`}>
        <Departments 
          deptList={props.deptList}
        />
        <SearchBar 
          handleSearch={props.handleSearch} 
          filteredList={props.filteredList} 
          dataList={props.dataList}
          suggestionList={props.suggestionList}
          toggleSuggestion={props.toggleSuggestion}
          suggestionToggler={props.suggestionToggler}
        />
      </div>
    </div>
  </div> 
  );
}
 
export default Navbar;