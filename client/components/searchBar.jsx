import React, { Component } from 'react';


class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { 

    }
  }
  render() { 
    return ( 
      <div className="col-9 column-adjust" >
        <div className="search-wrap">
          <form className="form-group form-group-adjust">
            <div className="row row-adjust d-flex dropdown">
              <input className="col-11 search-input" type="text" onClick={()=>(this.props.handleSearch({target:{value: ''}}))} onChange={(e)=> (this.props.handleSearch(e))} data-toggle="dropdown" placeholder="What are you looking for today?" aria-label="Search..." id="menu1" aria-describedby="basic-addon1"></input>
              <div className="col-1 search-icon-wrapper">
                <div className="search-icon lowes-icon">{"\uEB30"}</div>
              </div>
              <ul className="container dropdown-menu" role="menu" aria-labelledby="menu1" style={{'width': '812px', 'paddingLeft': '12px', 'paddingRight': '12px'}}>
                {this.props.filteredList !== null ? 
                  this.props.filteredList.map((entry, i) => {
                    return <li className="container" key={`${i}`} ><a href="#">{entry}</a></li>
                  })
                  : 
                  null
                }
              </ul>
            </div>
          </form>
        </div>
      </div>
     );
  }
}
 
export default SearchBar;