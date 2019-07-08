import React, { Component } from 'react';
import axios from 'axios';

class SearchBarSuggestions extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: null,
     }
  }

  componentDidMount() {
    // if(this.props.suggestion) {
      `https://fecdj.s3.amazonaws.com/photo/26.jpg` 
    // }
  }

  render() { 
    return ( 
      <div className="row row-suggestion">
      <div className="col-4">
        {
          this.props.suggestion ? 
              <img className='suggestion' src={`https://fecdj.s3.amazonaws.com/photo/${this.props.suggestion.id}.jpg`}/>
            : 
              null
          }
      </div>
      <div className="col-8">
        <div>
          {this.props.suggestion ? this.props.suggestion.itemName : null}
        </div>
        <div>
          {this.props.suggestion ? this.props.suggestion.rating : null}
        </div>
      </div>
    </div>
    );
  }
}

export default SearchBarSuggestions;