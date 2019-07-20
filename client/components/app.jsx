import React, { Component } from 'react';
import Banner from './banner/banner.jsx';
import Navbar from './navBar.jsx';
import axios from 'axios';
import adjust from '../style/adjust.less';
import { Toast } from 'react-bootstrap';

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
      loggingIn: false,
      loggingOut: false,
      usernameShow: '',
      signInPopover: false,
      showToast: false,
      favorite: {},
      saved: false,
      favoriteList: {},
      loginFail: false,
      signUpFail: false
    }
    this.deployed = true;
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
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.toastToggler = this.toastToggler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('stars', e => {
      const id = e.detail.id;
      axios.get(`http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/stats/${id}`, {withCredentials: true}).then((reviews) => {
        this.state.reviewStat[id-1] = reviews.data;
        this.setState({reviewStat: this.state.reviewStat})
      })
    });
    window.addEventListener('cart', (data) => {
      let newCartItem = data.detail;
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
        })
      })
    })
    window.addEventListener('favorite', (data) => {
      let favorite = data.detail;
      if(this.state.loggedIn) {
        let username = this.state.usernameShow
        if(!!favorite.saved === false) {
          axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/removefavorite', { username, favorite }, {withCredentials: true}).then((favoriteItemSaved)=> {
            let favoriteList = this.state.favoriteList;
            delete favoriteList[favorite.product_id];
            this.setState({showToast: true, favorite: favorite, saved: favorite.saved, favoriteList: favoriteList });
          })
        } else {
          axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savefavorite', { username, favorite }, {withCredentials: true}).then((favoriteItemSaved)=> {
            this.state.favoriteList[favorite.product_id] = favorite;
            this.setState({showToast: true, favorite: favorite, saved: favorite.saved, favoriteList: this.state.favoriteList });
          })
        }
      } else {
        this.setState({loginWindow: true});
      }
    })
    axios.get( 'http://search-banner.us-east-1.elasticbeanstalk.com/itemlist', {withCredentials: true})
    // axios.get('/itemlist')
    .then((itemlist) => {
      // console.log('got response from itemlist: ', itemlist)
      let promises =[];
      promises.push(axios.get( `http://search-banner.us-east-1.elasticbeanstalk.com/getcart`, {withCredentials: true}))
      promises.push(axios.get('http://ec2-18-225-6-113.us-east-2.compute.amazonaws.com/api/stats/all', {withCredentials: true}))
      Promise.all(promises).then((results) => {
        let total = 0;
        let cartItemList = results[0].data.cartItemList;
        let username = results[0].data.username;
        console.log('username:', username);
        let loggedIn = (username === undefined || username === 'Anonymous') ? false : true;
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
          reviewStat: results[1].data,
          loggedIn: loggedIn,
          logoutWindow: loggedIn,
          usernameShow: username
        }, () => {
          axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/getfavorite?username=${this.state.usernameShow}`, {withCredentials: true}).then((favorite) => {
            if(this.state.loggedIn) {
              let userFavorite = [];
              for (const id in favorite.data.favorite) {
                userFavorite.push(Number(id));
              }
              window.dispatchEvent(new CustomEvent('loggedIn', {detail: {loggedIn: true, favoriteList: userFavorite, username: this.state.usernameShow}}));
            }
            this.setState({
              favoriteList: favorite.data.favorite
            })
          })
        });
      })
    })

  }

  removeItem(cartId) {
    if(this.state.cartItemList[cartId].amount === 1) {
      this.state.cartItemList.splice(cartId, 1);
      this.setState({cartNumItemTotal: this.state.cartNumItemTotal-1, cartItemList: this.state.cartItemList}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
          axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/deleteCartItem', {}, {withCredentials: true}).then(() => {
          })
        })
      });
    } else {
      this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount - 1;
      this.setState({cartNumItemTotal: this.state.cartNumItemTotal-1, cartItemList: this.state.cartItemList}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
        })
      })
    }
  }

  addItem(cartId) {
    this.state.cartItemList[cartId].amount = this.state.cartItemList[cartId].amount + 1;
    this.setState({cartNumItemTotal: this.state.cartNumItemTotal+1, cartItemList: this.state.cartItemList}, () => {
      axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/savecart', { cartItemList: this.state.cartItemList} , {withCredentials: true}).then(() => {
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
    this.setState({ password: password });
  }

  createAccount() {
    let username = this.state.username;
    let password = this.state.password;
    if(!username) {
      this.setState({signUpFail: true});
    } else if(!password) {
      this.setState({signUpFail: true});
    } else {
      axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/signup', { username, password }, {withCredentials: true}).then((signedUp) => {
        console.log('signedup!', signedUp);
        this.setState({signUpFail: false});
      })
    }
  }

  toastToggler() {
    this.setState({showToast: false});
  }

  signInPopoverToggler() {

  }

  logIn() {
    let username = this.state.username;
    let password = this.state.password;
    if(!username) {
      this.setState({loginFail: 'username'});
    } else if(!password) {
      this.setState({loginFail: 'password'});
    } else {
      
      this.setState({loggingIn: true}, () => {
        axios.post('http://search-banner.us-east-1.elasticbeanstalk.com/login', { username, password }, { withCredentials: true }).then((loggedIn) => {
          if(loggedIn.data === true) {
            
            axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/getusercart?username=${username}`, {withCredentials: true}).then((userCart) => {
              let totalCartItem = 0;
              let userCartItemList = [];
              if(userCart.data) {
                userCart.data.cartItemList.forEach((cartItem) => {
                  totalCartItem += cartItem.amount;
                })
                userCartItemList = userCart.data.cartItemList;
              }
              axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/getfavorite?username=${username}` ,{withCredentials: true}).then((userFavorites) => {
                let userFavorite = [];
                for (const id in userFavorites.data.favorite) {
                  userFavorite.push(Number(id));
                }
                window.dispatchEvent(new CustomEvent('loggedIn', {detail: {loggedIn: true, favoriteList: userFavorite, username: this.state.usernameShow}}));
                setTimeout(() => {
                  this.setState({
                    loggedIn: loggedIn.data, 
                    loginWindow: false, 
                    usernameShow: username, 
                    loggingIn: false , 
                    username: '', 
                    password: '', 
                    cartItemList: userCartItemList, 
                    logoutWindow: loggedIn.data,
                    cartNumItemTotal: totalCartItem,
                    favoriteList: userFavorites.data.favorite,
                    loginFail: false
                    });
                }, 1500);
              })
            })
          } else {
            setTimeout(() => {
              let loginFailMsg = loggedIn.data === false ? 'password' : 'username';
              this.setState({loggedIn: false, usernameShow: false, loggingIn: false , username: username, password: '', loginFail: loginFailMsg});
            }, 1500);
          }
      })}
      );
    }
  }

  logOut() {
    let username = this.state.usernameShow;
    this.setState({loggingOut: true}, () => {
      axios.get(`http://search-banner.us-east-1.elasticbeanstalk.com/logout?username=${username}`, { withCredentials: true }).then((result) => {
        window.dispatchEvent(new CustomEvent('loggedOut', {detail: {loggedIn: false}}));
        this.setState({loggedIn: false, usernameShow: '', logoutWindow: false, loggingOut: false, cartItemList: [], cartNumItemTotal: 0});
      })
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
          usernameShow={this.state.usernameShow}
          password={this.state.password}
          signUpWindow={this.state.signUpWindow}
          signUpWindowToggler={this.signUpWindowToggler}
          handlePassword={this.handlePassword}
          handleUsername={this.handleUsername}
          createAccount={this.createAccount}
          loggingIn={this.state.loggingIn}
          loggingOut={this.state.loggingOut}
          logIn={this.logIn}
          logOut={this.logOut}
          favoriteList={this.state.favoriteList}
          loginFail={this.state.loginFail}
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
          <div
            aria-live="polite"
            aria-atomic="true"
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: '50px',
                zIndex: '10'
              }}
            >
            <Toast onClose={() => this.toastToggler()} show={this.state.showToast} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">{this.state.saved ? 'Saved to ' : 'Removed from '} {this.state.usernameShow}'s favorite!</strong>
                <small>Just Now</small>
              </Toast.Header>
              <Toast.Body>
                <div className="row">
                  <div className="col-4">
                    {this.state.showToast ? 
                      <img style={{width: '100px', height: '100px'}} src={`https://fecdj.s3.amazonaws.com/photo/${this.state.favorite['product_id']}.jpg`}/>
                    :
                      null
                    }
                  </div>
                  <div className="col-8">
                    {this.state.favorite.name} 
                  </div>
                </div>
              </Toast.Body>
            </Toast>
            
          </div>
        </div>
      </header>
     );
  }
}
 
export default App;