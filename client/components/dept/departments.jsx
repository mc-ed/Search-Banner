import React, { Component } from 'react';
import DepartmentList from './departmentList.jsx';
import style from '../../style/main.less'
import axios from 'axios';


class Departments extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        entering: null,
        leaving: null,
        categoriesPerDept: [],
        updated: false
     }
     this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
     this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  componentDidUpdate() {
    if(!this.state.updated) {
      let categoriesPerDept = [];
      for (let index = 0; index < this.props.sortedCategorySet.length; index++) {
        const category = this.props.sortedCategorySet[index];
        
        const dept = this.props.dataList[category].department;
        if(categoriesPerDept[this.props.deptList.indexOf(dept)] === undefined) {
          categoriesPerDept[this.props.deptList.indexOf(dept)] = [];
        } 
        categoriesPerDept[this.props.deptList.indexOf(dept)].push(category);
      }
      this.setState({ categoriesPerDept: categoriesPerDept, updated: true });
    } 
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
        <div className={`row ${style['row-adjust']}`} style={{position: 'absolute'}} onMouseEnter={()=> this.props.deptToggler()} onMouseLeave={()=> this.props.deptToggler()}>
          <div className={`col-3 ${style['column-adjust']} ${style['destroy-padding-right']}`}>
            <div className={`${style['hamburger-wrapper']}`}>
              <div className={`${style['lowes-icon']} ${style.hamburger}`}>{'\uEC6E'}</div>
            </div>
          </div>
          <div className={`col-9 ${style['column-adjust']}`}>
            <div id="dept-wrapper" className={`${style['department-wrapper']}`}>
              <a className={`${style.department}`} >  Departments         </a>
            </div>
              {this.props.showDept ? 
                  <DepartmentList 
                    dataList={this.props.dataList} 
                    deptList={this.props.deptList}
                    categoriesPerDept={this.state.categoriesPerDept}
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
