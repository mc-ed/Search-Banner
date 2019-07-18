import React, { Component } from 'react';
import DepartmentList from './departmentList.jsx';
import style from '../../style/main.less'


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

    const browsingColor = this.props.showDept ? '#004990' : '#0471af';
    
    if(this.state.updated) {
      return ( 
        <React.Fragment>
          <div className={`col-3 ${style['column-adjust']}`} style={{backgroundColor: browsingColor}}  onMouseEnter={()=> this.props.deptToggler()} onMouseLeave={()=> this.props.deptToggler()}>
            <div className={`${style.deptDropDownWrapper}`}>
          <div className={`row ${style['row-adjust']}`} >  
            <div className={`col-2 ${style['column-adjust']} ${style['destroy-padding-right']}`} >
              <div className={`${style['hamburger-wrapper']}`} >
                <div className={`${style['lowes-icon']} ${style.hamburger}`}>{'\uEC6E'}</div>
              </div>
            </div>
            <div className={`col-7 ${style['column-adjust']} ${style.popper}`} >
              <div id="dept-wrapper" className={`${style['department-wrapper']}`} >
                <a className={`${style.department}`} >Departments</a>
              </div>
            </div>
            <div className={`col-3`}>
              <div className={`${style.dropDownIconWrapper}`} >
                <div className={`${style['drop-down-icon']}`}></div>
              </div>
            </div>
          </div>
          <DepartmentList 
            handleBrowsing={this.props.handleBrowsing}
            dataList={this.props.dataList} 
            deptList={this.props.deptList}
            categoriesPerDept={this.state.categoriesPerDept}
            onMouseEnterHandler={this.onMouseEnterHandler} 
            onMouseLeaveHandler={this.onMouseLeaveHandler}
            category={this.state.entering}
            deptToggler={this.props.deptToggler}
          />
          </div>
        </div>
          
        </React.Fragment>
        
        
      );
    } else {
      return null;
    }
  }
}
 
export default Departments;
