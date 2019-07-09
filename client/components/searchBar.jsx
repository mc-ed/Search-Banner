import React, { Component } from 'react';
import Suggestion from './searchBarSuggestions.jsx';

const SearchBar = (props) => {
  
  return ( 
    <div className="col-9 column-adjust" >
      <div className="search-wrap">
        <form className="form-group form-group-adjust">
          <div className="row row-adjust d-flex dropdown">
            <input className="col-11 search-input" type="text" onClick={()=>(props.handleSearch({target:{value: ''}}))} onChange={(e)=> (props.handleSearch(e))} data-toggle="dropdown" placeholder="What are you looking for today?" aria-label="Search..." id="menu1" aria-describedby="basic-addon1"></input>
            <div className="col-1 search-icon-wrapper">
              <div className="search-icon lowes-icon">{"\uEB30"}</div>
            </div>
            <div className="container dropdown-menu liner" role="menu" aria-labelledby="menu1">
              <div className="row row-adjust">
                <div className="col-3 search-item" onMouseOver={(e) => props.reRenderSuggestions(e)}>
                  {props.filteredList !== null ? 
                    props.filteredList.map((entry, i) => {
                      return <li className="search-item" key={`${i}`} ><a href="#">{entry}</a></li>
                    })
                    : 
                    null
                  }
                </div>
                <div className="col-9 padding-adjust">
                  <div className="product-suggestion">Product Suggestions</div>
                  <Suggestion suggestion={props.suggestionList[0]}/>
                  <Suggestion suggestion={props.suggestionList[1]}/>
                  <Suggestion suggestion={props.suggestionList[2]}/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    );
  }

 
export default SearchBar;