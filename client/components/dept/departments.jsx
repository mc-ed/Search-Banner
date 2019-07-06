import React, { Component } from 'react';
import DepartmentList from './departmentList.jsx';
class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        entering: null,
        leaving: null
     }
     this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
     this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  onMouseEnterHandler(e) {
    e.target.style.backgroundColor = '#E5E5E5';
  }

  onMouseLeaveHandler(e) {
    e.target.style.backgroundColor = 'white';
  }  

  render() { 
    return ( 
      <div className="col-3 column-adjust d-flex dropdown">
        <div className="drop-down-arrow-icon-wrapper">
          <div className="lowes-icon hamburger">{'\uEC6E'}
          </div>
          <DepartmentList 
            deptList={this.props.deptList} 
            onMouseEnterHandler={this.onMouseEnterHandler} 
            onMouseLeaveHandler={this.onMouseLeaveHandler} 
          />
          <div id="dropdown-icon" className="drop-down-arrow-icon lowes-icon ">{"\uEDBF"}
          </div>
        </div>
      </div>
    );
  }
}
 
export default Departments;
