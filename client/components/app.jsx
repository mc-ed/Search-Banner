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

  }

  componentDidMount() {
    axios.get('/itemlist').then((itemlist) => {
      let data = {};
      itemlist.data.forEach((item) => {
        data[item.id] = item;
      })
      this.setState({
        
          dataList: data,
          itemList: itemlist.data.map((item) => {
            let finalName = item.itemName;
            if(finalName.length > 17) {
              let words = finalName.split('-');
              finalName = words[0];
            }
            return finalName;
          }),
          itemListShowing: [... new Set(itemlist.data.map((item, i) => {
            return item.category;
          }))]
        
    });
    })
  }

  handleSearch(e) {
    console.log(e.target.value);
    const { itemListShowing } = this.state;
    const filteredDataList = itemListShowing.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    if(filteredDataList.length === 0) {
      this.setState({noMatch: true})
    } else {
      this.setState({filteredList: filteredDataList}, () => {
        axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
          let suggestionList = result.data;
          
          this.setState({ suggestionList });
        })
      });
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
        <div className="container">
        <Banner />
        </div>
        <Navbar 
        handleSearch={this.handleSearch} 
        filteredList={this.state.filteredList} 
        dataList={this.state.dataList}
        deptList={this.state.deptList}
        suggestionList={this.state.suggestionList}
        />
      </header>
     );
  }
}
 
export default App;