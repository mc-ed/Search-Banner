import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import SearchBar from './searchBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: ['Appliances', 'Bathroom', 'Building Supplies', 'Doors & Windows', 'Electrical'],
      dataList: ['hammer', 'refrigerator', 'door', 'chair', 'sofa', 'hammock', 'deodorant', 'roooooo', 'doggo'],
      filteredList: [],
      noMatch: false
    }
  this.handleSearch = this.handleSearch.bind(this);

  }

  handleSearch(e) {
    console.log(e.target.value);
    const { dataList } = this.state;
    const filteredDataList = dataList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    if(filteredDataList.length === 0) {
      this.setState({noMatch: true})
    } else {
      this.setState({filteredList: filteredDataList});
    }

  }

  renderSuggestion() {
    this.state.filteredList.map((entry) => {
      return <li role="presentation"><a role="menuitem" tabIndex="-1" href="#">{entry}</a></li>
    })
  }
  // handleMouseEnter() {
  //   this.setState({deptList: ['Appliances', 'Bathroom', 'Building Supplies', 'Doors & Windows', 'Electrical']});
  // }

  render() { 
    return ( 
      <header>
        <Banner />
        <Navbar 
        handleSearch={this.handleSearch} 
        filteredList={this.state.filteredList} 
        dataList={this.state.dataList}
        deptList={this.state.deptList}
        />
      </header>
     );
  }
}
 
export default App;