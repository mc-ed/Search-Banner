import React, { Component } from 'react';
import style from '../style/main.less';

class SearchBarSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      entering: null,
      leaving: null
   }
   this.onMouseEnterHandler = this.onMouseEnterHandler.bind(this);
   this.onMouseLeaveHandler = this.onMouseLeaveHandler.bind(this);
  }

  onMouseEnterHandler(e) {

    // e.target.style.backgroundColor = '#E5E5E5';
    this.setState({entering: e.target.innerHTML});
  }

  onMouseLeaveHandler(e) {
    e.target.style.backgroundColor = 'white';
    this.setState({entering: null});
  }  

  render() { 
    let stars;
    if(this.props.suggestion) {
      stars = Number(this.props.reviewStat.reviewStats.averageStars)*10;
      stars = stars%5<3 ? (stars%5===0 ? stars : Math.floor(stars/5)*5) : Math.ceil(stars/5)*5;
    }
    return ( 
      <div className={`row ${style['row-suggestion']} ${style['row-hover']}`} onClick={() => (window.dispatchEvent(new CustomEvent('product',{detail: {product_id: this.props.suggestion.id}})))} >
      <div className={`col-4 ${style.child}`} >
        {
          this.props.suggestion ? 
              <img className={`${style.suggestion}`} src={`https://fecdj.s3.amazonaws.com/photo/${this.props.suggestion.id}.jpg`}/>
            : 
              null
          }
      </div>
      <div className={`col-8 ${style.child}`} onMouseOver={(e) => this.onMouseEnterHandler(e)} onMouseOut={(e) => this.onMouseLeaveHandler(e)} >
        <div className={`${style.child}`}>
          {this.props.suggestion ? this.props.suggestion.itemName : null}
        </div>
        <div className={`${style.child}`}>
          {this.props.suggestion ? <a className={`${style[`star-${stars}`]}`}></a> : null}
          {this.props.suggestion ? ' (' + this.props.reviewStat.reviewStats.reviewCount + ') ' : null}
        </div>
      </div>
    </div>
    );
  }
}

export default SearchBarSuggestions;