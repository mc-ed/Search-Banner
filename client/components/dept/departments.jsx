import React, { Component } from 'react';
import DepartmentList from './departmentList.jsx';
import DepartmentSubMenu from './departmentSubMenu.jsx';
import style from '../../style/main.less'

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
    this.setState({entering: e.target.innerHTML});
  }

  onMouseLeaveHandler(e) {
    e.target.style.backgroundColor = 'white';
    this.setState({entering: null});
  }  

  render() { 
    return ( 
      <div className={`col-3 ${style['column-adjust']} d-flex dropdown`}>
        <div className={`${style['drop-down-arrow-icon-wrapper']}`}>
          <div className={`${style['lowes-icon']} ${style.hamburger}`}>{'\uEC6E'}
          </div>
          <DepartmentList 
            deptList={this.props.deptList} 
            onMouseEnterHandler={this.onMouseEnterHandler} 
            onMouseLeaveHandler={this.onMouseLeaveHandler}
            category={this.state.entering}
          />
          <div id="dropdown-icon" className={`${style['drop-down-arrow-icon']} ${style['lowes-icon']} `}>{"\uEDBF"}
          </div>
        </div>
      </div>
    );
  }
}
 
export default Departments;
