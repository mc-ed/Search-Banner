import React, { Component } from 'react';
import style from '../../style/main.less'
import { Carousel } from 'react-bootstrap';
import axios from 'axios';

class SubMenuCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      mounted: false
    }
  }

  componentDidMount() {
    if(!this.state.mounted) {
      axios.get(`/items?category=${this.props.category}`, {withCredentials: true}).then((items) => {
      // axios.get(`/items?category=${this.props.category}`).then((items) => {
        this.setState({ items: items.data, mounted: true })
      })
    }
  }
  render() { 
    return ( 
      // <OverlayTrigger trigger={['click']} placement="right" overlay={popover}>
        <li className={`dropdown-submenu ${style['dropdown-submenu']}`}> 
            <a>{this.props.category}</a>
            <div className={`dropdown-menu ${style['dropdown-menu']}`}>
              <Carousel interval={1000}>
                {this.state.items.map((item, i) => {
                  return (
                    <Carousel.Item key={i}>
                      <img className={`${style['carousel-img']}`} src={`https://fecdj.s3.amazonaws.com/photo/${item.id}.jpg`} alt="" onClick={() => (window.dispatchEvent(new CustomEvent('product',{detail: {product_id: item.id}})))}/>
                    </Carousel.Item>
                    )
                })}
              </Carousel>
            </div>
        </li>
      // {/* </OverlayTrigger> */}
      // <div className={`dropdown-submenu`}>
      //   Hi
      // </div>
      // null
     );
  }
}
 
export default SubMenuCategory;