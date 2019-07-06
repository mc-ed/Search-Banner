import React, { Component } from 'react';
import SearchBar from './searchBar.jsx';
import Departments from './dept/departments.jsx';

const Navbar = (props) => {
  return ( 
  <div className="navbar">
    <div className="container">
      <div className="row row-adjust">
        <Departments 
          deptList={props.deptList}
        />
        <SearchBar 
          handleSearch={props.handleSearch} 
          filteredList={props.filteredList} 
          dataList={props.dataList}
        />
      </div>
    </div>
  </div> 
  );
}
 
export default Navbar;