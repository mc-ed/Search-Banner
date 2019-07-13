import React, { Component } from 'react';
import style from '../../style/main.less'
import { Popover, OverlayTrigger, Carousel } from 'react-bootstrap';
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
      axios.get(`/item?category=${this.props.category}`).then((items) => {
        this.setState({ items: items.data, mounted: true })
      })
    }
  }
  render() { 
    const popover = (
      <Popover id="popover-basic" title={this.props.category}>
        <Carousel interval={1000}>
            {this.state.items.map((item, i) => {
              return (
                  <Carousel.Item key={i}>
                    <img className={`${style['carousel-img']}`} src={`https://fecdj.s3.amazonaws.com/photo/${item.id}.jpg`} alt=""/>
                    {/* <Carousel.Caption>
                      <div style={{color: '#5d5d5d'}}>And here's some <strong>{item.itemName}</strong> content. It's very engaging. right?</div>
                    </Carousel.Caption> */}
                  </Carousel.Item>
              )
            })}
            Giselle
        </Carousel>
      </Popover>
    );
    return ( 
      <OverlayTrigger trigger={['hover','focus']} placement="right" overlay={popover}>
        <li > 
            <a>{this.props.category}</a>
        </li>
      </OverlayTrigger>
     );
  }
}
 
export default SubMenuCategory;