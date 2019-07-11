import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import axios from 'axios';
import style from '../style/main.less'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: ['Appliances', 'Bathroom', 'Building Supplies', 'Doors and Windows', 'Electrical'],
      itemListShowing: [],
      itemList: [],
      suggestionList: [],
      dataList: {},
      filteredList: [],
      noMatch: false,
      cartNumItem: 0,
      toggleSuggestion: false,
      showCart: false
    }
  this.handleSearch = this.handleSearch.bind(this);
  this.suggestionToggler = this.suggestionToggler.bind(this);
  this.cartModalToggler = this.cartModalToggler.bind(this);
  }

  componentDidMount() {
    axios.get('http://search-banner.us-east-1.elasticbeanstalk.com/itemlist').then((itemlist) => {
      let data = {};
      itemlist.data.forEach((item) => {
        data[item.category] = item;
      })
      this.setState({
        
          dataList: data,
          itemList: itemlist.data.map((item) => {
            let category = item.category;
            return category;
          }),
          itemListShowing: [... new Set(itemlist.data.slice(0,25).map((item, i) => {
            return item.category;
          }))]
        
    });
    })
  }

  suggestionToggler() {
    this.setState({toggleSuggestion: !this.state.toggleSuggestion});
  }

  cartModalToggler() {
    this.setState({showCart: !this.state.showCart});
  }

  handleSearch(e) {
    const { itemList } = this.state;
    const filteredDataList = itemList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    if(filteredDataList.length === 0) {
      this.setState({noMatch: true})
    } else {
      this.setState({filteredList: [... new Set(filteredDataList)].slice(0,16)}, () => {
        axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`).then((result) => {
          let suggestionList = result.data;
          
          this.setState({ suggestionList });
        })
      });
    }

  }


  render() { 
    return ( 
      <header>
        <div className="container">
        <Banner cartNumItem={this.state.cartNumItem} showCart={this.state.showCart} cartModalToggler={this.cartModalToggler}/>
        </div>
        <Navbar 
        handleSearch={this.handleSearch} 
        filteredList={this.state.filteredList} 
        dataList={this.state.dataList}
        deptList={this.state.deptList}
        suggestionList={this.state.suggestionList}
        suggestionToggler={this.suggestionToggler}
        toggleSuggestion={this.state.toggleSuggestion}
        />
      </header>
     );
  }
}
 
export default App;