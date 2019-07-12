import React, { Component } from 'react';
import DepartmentList from './departmentList.jsx';
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

  onMouseEnterHandler(department) {
    this.setState({entering: department});
  }

  onMouseLeaveHandler(department) {
    this.setState({entering: null});
  }  

  render() { 

    return ( 
      <div className={`col-3 ${style['column-adjust']}`}>
        {/* <div className={`row ${style['row-adjust']}`} style={{position: 'absolute'}} onMouseEnter={()=> this.props.deptToggler()} onMouseLeave={()=> this.props.deptToggler()}> */}
        <div className={`row ${style['row-adjust']}`} style={{position: 'absolute'}}>  
          <div className={`col-3 ${style['column-adjust']} ${style['destroy-padding-right']}`}>
            <div className={`${style['hamburger-wrapper']}`}>
              <div className={`${style['lowes-icon']} ${style.hamburger}`}>{'\uEC6E'}</div>
            </div>
          </div>
          <div className={`col-9 ${style['column-adjust']}`}>
            <div className={`${style['department-wrapper']}`}>
              <a className={`${style.department}`} >  Departments         </a>
            </div>
              {this.props.showDept ? 
                  <DepartmentList 
                    deptList={this.props.deptList} 
                    onMouseEnterHandler={this.onMouseEnterHandler} 
                    onMouseLeaveHandler={this.onMouseLeaveHandler}
                    category={this.state.entering}
                    deptToggler={this.props.deptToggler}
                  />
                :
                null
              }
          </div>
        </div>
      </div>
    );
  }
}
 
export default Departments;
