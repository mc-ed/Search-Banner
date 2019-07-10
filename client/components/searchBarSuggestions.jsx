import React, { Component } from 'react';
import axios from 'axios';

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
      stars = this.props.suggestion.rating*10;
    }
    return ( 
      <div className="row row-suggestion row-hover" onClick={() => (window.dispatchEvent(new CustomEvent('product',{detail: {product_id: this.props.suggestion.id}})))} >
      <div className="col-4 child" >
        {
          this.props.suggestion ? 
              <img className='suggestion' src={`https://fecdj.s3.amazonaws.com/photo/${this.props.suggestion.id}.jpg`}/>
            : 
              null
          }
      </div>
      <div className="col-8 child" onMouseOver={(e) => this.onMouseEnterHandler(e)} onMouseOut={(e) => this.onMouseLeaveHandler(e)} >
        <div className="child">
          {this.props.suggestion ? this.props.suggestion.itemName : null}
        </div>
        <div className="child">
          {this.props.suggestion ? <a className={`star-${stars}`}></a> : null}
          {this.props.suggestion ? ' (' + this.props.suggestion.numRating + ') ' : null}
        </div>
      </div>
    </div>
    );
  }
}

export default SearchBarSuggestions;