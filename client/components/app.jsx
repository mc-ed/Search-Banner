import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import axios from 'axios';
import adjust from '../style/adjust.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deptList: [],
      sortedCategorySet: [],
      itemList: [],
      suggestionList: [],
      dataList: {},
      filteredList: [],
      noMatch: false,
      cartItemList: [],
      cartNumItemTotal: 0,
      toggleSuggestion: false,
      showCart: false,
      showDept: false,
      browsing: false
    }
    this.deployed = true;
    this.ip = this.deployed ? 'http://search-banner.us-east-1.elasticbeanstalk.com' : '';
    this.handleSearch = this.handleSearch.bind(this);
    this.suggestionToggler = this.suggestionToggler.bind(this);
    this.cartModalToggler = this.cartModalToggler.bind(this);
    this.deptToggler = this.deptToggler.bind(this);
    this.handleBrowsing = this.handleBrowsing.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    // TO BE DONE WHEN SOMETHING IS ADDED TO CART
    // axios.post(this.ip + '/savecart', { cartItemList: this.state.cartItemList}).then(() => {
      //   console.log('saved!')
      // })
      
      axios.get( 'http://search-banner.us-east-1.elasticbeanstalk.com/getcart').then((cart) => {
        // axios.get( '/getcart').then((cart) => {
        let total = 0;
        let cartItemList = cart.data.cartItemList;
        if(cartItemList && cartItemList.length > 0) {
          for (let index = 0; index < cartItemList.length; index++) {
            const element = cartItemList[index].amount;
            total += element;
          }
        } else {
          cartItemList = [];
        }
        axios.get( 'http://search-banner.us-east-1.elasticbeanstalk.com/itemlist').then((itemlist) => {
          // axios.get('/itemlist').then((itemlist) => {
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
              }))],
              cartItemList: cartItemList,
              cartNumItemTotal: total
          });
        })
    })

  }

  removeItem(cartId) {
    console.log(cartId);
    this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount - 1;
    this.setState({cartNumItemTotal: this.state.cartNumItemTotal-1, cartItemList: this.state.cartItemList}, () => {
      axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList}).then(() => {
        console.log('saved!')
      })
    });
  }

  addItem(cartId) {
    console.log(cartId);
    this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount + 1;
    this.setState({cartNumItemTotal: this.state.cartNumItemTotal+1, cartItemList: this.state.cartItemList}, () => {
      axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList}).then(() => {
        console.log('saved!')
      })
    });
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

  handleBrowsing() {
    this.setState({browsing: !this.state.browsing});
  }

  handleSearch(e, hovering) {
    const { itemList } = this.state;
    const filteredDataList = itemList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    
      if(!hovering) {
        this.setState({filteredList: [... new Set(filteredDataList)]}, () => {
          axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`).then((result) => {
            // axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
            let suggestionList = result.data;
            this.setState({ suggestionList });
          })
        });
      } else {
        axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`).then((result) => {
          // axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
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
          cartNumItemTotal={this.state.cartNumItemTotal} 
          showCart={this.state.showCart} 
          addItem={this.addItem}
          cartItemList={this.state.cartItemList}
          removeItem={this.removeItem}
          cartModalToggler={this.cartModalToggler}
        />
        </div>
        <Navbar 
          browsing={this.state.browsing}
          handleBrowsing={this.handleBrowsing}
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
        {this.state.showDept ? 
            <div className={`${adjust.greyOut}`}></div>
            :
            null
          }
      </header>
     );
  }
}
 
export default App;