import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import SearchBar from './searchBar.jsx';
import axios from 'axios';

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
      noMatch: false
    }
  this.handleSearch = this.handleSearch.bind(this);
  this.reRenderSuggestions = this.reRenderSuggestions.bind(this);
  }

  componentDidMount() {
    axios.get('/itemlist').then((itemlist) => {
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

  reRenderSuggestions(e) {
    // console.log(e.target);
  }

  handleSearch(e) {
    const { itemList } = this.state;
    const filteredDataList = itemList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    if(filteredDataList.length === 0) {
      this.setState({noMatch: true})
    } else {
      this.setState({filteredList: [... new Set(filteredDataList)].slice(0,16)}, () => {
        axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
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
        <Banner />
        </div>
        <Navbar 
        handleSearch={this.handleSearch} 
        filteredList={this.state.filteredList} 
        dataList={this.state.dataList}
        deptList={this.state.deptList}
        suggestionList={this.state.suggestionList}
        reRenderSuggestions={this.reRenderSuggestions}
        />
      </header>
     );
  }
}
 
export default App;