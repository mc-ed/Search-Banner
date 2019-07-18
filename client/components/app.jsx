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
      browsing: false,
      reviewStat: [],
      loginWindow: false,
      logoutWindow: false,
      loggedIn: false,
      signUpWindow: false,
      username: '',
      password: '',
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
    this.loginWindowToggler = this.loginWindowToggler.bind(this);
    this.logoutWindowToggler =this.logoutWindowToggler.bind(this);
    this.signUpWindowToggler = this.signUpWindowToggler.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  componentDidMount() {
    window.addEventListener('cart', (data) => {
      let newCartItem = data.detail;
      console.log('woo new item to cart!', data.detail);
      newCartItem.price = Number(data.detail.price);
      let exists = false;
      let existingIndex = -1;
      for (let index = 0; index < this.state.cartItemList.length; index++) {
        const element = this.state.cartItemList[index];
        if(element.id === newCartItem.id) {
          exists = true;
          existingIndex = index;
        }
      }
      if(exists) {
        this.state.cartItemList[existingIndex].amount += newCartItem.amount;
      } else {
        this.state.cartItemList.push(newCartItem);
      }
      this.setState({cartNumItemTotal: this.state.cartNumItemTotal+newCartItem.amount, cartItemList: this.state.cartItemList}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
          console.log('saved!')
        })
      })
    })
    axios.get( 'http://search-banner.us-east-1.elasticbeanstalk.com/itemlist', {withCredentials: true})
    // axios.get('/itemlist')
    .then((itemlist) => {
      // console.log('got response from itemlist: ', itemlist)
      let promises =[];
      promises.push(axios.get( 'http://search-banner.us-east-1.elasticbeanstalk.com/getcart', {withCredentials: true}))
      promises.push(axios.get('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/stats/all', {withCredentials: true}))
      Promise.all(promises).then((results) => {
        let total = 0;
        let cartItemList = results[0].data.cartItemList;
        if(cartItemList && cartItemList.length > 0) {
          for (let index = 0; index < cartItemList.length; index++) {
            const element = cartItemList[index].amount;
            total += element;
          }
        } else {
          cartItemList = [];
        }
        let data = {};
        itemlist.data.forEach((item) => {
          data[item.category] = item;
        });
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
          cartNumItemTotal: total,
          reviewStat: results[1].data
        });
      })
    })

  }

  removeItem(cartId) {
    console.log(cartId);
    if(this.state.cartItemList[cartId].amount === 1) {
      this.state.cartItemList.splice(cartId, 1);
      this.setState({cartNumItemTotal: this.state.cartNumItemTotal-1, cartItemList: this.state.cartItemList}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
          console.log('saved!')
          axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/deleteCartItem', {}).then(() => {
            console.log('delted 0 item from cart!');
          })
        })
      });
    } else {
      this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount - 1;
      this.setState({cartNumItemTotal: this.state.cartNumItemTotal-1, cartItemList: this.state.cartItemList}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
          console.log('saved!')
        })
      })
    }
  }

  addItem(cartId) {
    console.log(cartId);
    this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount + 1;
    this.setState({cartNumItemTotal: this.state.cartNumItemTotal+1, cartItemList: this.state.cartItemList}, () => {
      axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
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

  loginWindowToggler() {
    this.setState({loginWindow: !this.state.loginWindow}, () => {
      setTimeout(() => {
        this.setState({signUpWindow: false})
      }, 100);
    });
  }

  logoutWindowToggler() {
    this.setState({logoutWindow: !this.state.logoutWindow});
  }

  signUpWindowToggler() {
    this.setState({signUpWindow: !this.state.signUpWindow, username: '', password: ''});
  }

  handleUsername(e) {
    let username = e.target.value;
    this.setState({ username: username });
  }

  handlePassword(e) {
    let password = e.target.value;
    console.log(password)
    this.setState({ password: password });
  }

  createAccount() {
    let username = this.state.username;
    let password = this.state.password;
    axios.post('/signup', { username, password }, {withCredentials: true}).then((signedUp) => {
      console.log('signed up! got back: ', signedUp);
    })
  }

  handleBrowsing() {
    this.setState({browsing: !this.state.browsing});
  }

  handleSearch(e, hovering) {
    const { itemList } = this.state;
    const filteredDataList = itemList.filter(item => item.toLowerCase().startsWith(e.target.value.toLowerCase()));
    
    
      if(!hovering) {
        this.setState({filteredList: [... new Set(filteredDataList)]}, () => {
          axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`, {withCredentials: true}).then((result) => {
            // axios.get(`/item?category=${filteredDataList[0]}`).then((result) => {
            let suggestionList = result.data;
            this.setState({ suggestionList });
          })
        });
      } else {
        axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/item?category=${filteredDataList[0]}`, {withCredentials: true}).then((result) => {
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
          loggedIn={this.state.loggedIn}
          loginWindow={this.state.loginWindow}
          logoutWindow={this.state.logoutWindow}
          loginWindowToggler={this.loginWindowToggler}
          logoutWindowToggler={this.logoutWindowToggler}
          username={this.state.username}
          password={this.state.password}
          signUpWindow={this.state.signUpWindow}
          signUpWindowToggler={this.signUpWindowToggler}
          handlePassword={this.handlePassword}
          handleUsername={this.handleUsername}
          createAccount={this.createAccount}
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
          reviewStat={this.state.reviewStat}
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