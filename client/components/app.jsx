import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: ['Appliances', 'Bathroom', 'Building Supplies', 'Doors and Windows', 'Electrical'],
      sortedCategorySet: [],
      itemList: [],
      suggestionList: [],
      dataList: {},
      filteredList: [],
      noMatch: false,
      cartNumItem: 0,
      toggleSuggestion: false,
      showCart: false,
      showDept: false
    }
  this.handleSearch = this.handleSearch.bind(this);
  this.suggestionToggler = this.suggestionToggler.bind(this);
  this.cartModalToggler = this.cartModalToggler.bind(this);
  this.deptToggler = this.deptToggler.bind(this);
  }

  componentDidMount() {
    // axios.get('http://search-banner.us-east-1.elasticbeanstalk.com/itemlist').then((itemlist) => {
      axios.get('/itemlist').then((itemlist) => {
      let data = {};
      itemlist.data.forEach((item) => {
        data[item.category] = item;
      })
      // console.log(itemlist.data);
      this.setState({
        
          dataList: data,
          deptList: [... new Set(itemlist.data.map((item) => {
            let dept = item.department;
            return dept;
          }).sort())],
          itemList: itemlist.data.map((item) => {
            let category = item.category;
            return category;
          }),
          sortedCategorySet: [... new Set(itemlist.data.map((item, i) => {
            return item.category;
          }))]
        
    });
    })
  }

  deptToggler() {
    this.setState({showDept: !this.state.showDept})
  }

  suggestionToggler() {
    this.setState({toggleSuggestion: !this.state.toggleSuggestion});
  }

  cartModalToggler() {
    this.setState({showCart: !this.state.showCart});
  }

  handleSearch(e, hovering) {
    const { itemList } = this.state;
    const filteredDataList = itemList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    
      if(!hovering) {
        this.setState({filteredList: [... new Set(filteredDataList)]}, () => {
          // axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`).then((result) => {
            axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
            let suggestionList = result.data;
            this.setState({ suggestionList });
          })
        });
      } else {
        // axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`).then((result) => {
          axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
            let suggestionList = result.data;
            this.setState({ suggestionList });
          })
      }
    
  }



  render() { 
    return ( 
      <header>
        <div className="container">
        <Banner 
          cartNumItem={this.state.cartNumItem} 
          showCart={this.state.showCart} 
          cartModalToggler={this.cartModalToggler}
        />
        </div>
        <Navbar 
          handleSearch={this.handleSearch} 
          filteredList={this.state.filteredList} 
          dataList={this.state.dataList}
          deptList={this.state.deptList}
          suggestionList={this.state.suggestionList}
          suggestionToggler={this.suggestionToggler}
          toggleSuggestion={this.state.toggleSuggestion}
          deptToggler={this.deptToggler}
          showDept={this.state.showDept}
          sortedCategorySet={this.state.sortedCategorySet}
        />
      </header>
     );
  }
}
 
export default App;