import React, { Component } from 'react';
import Suggestion from './searchBarSuggestions.jsx';
import style from '../style/main.less';

const SearchBar = (props) => {
  
  return ( 
    <div className={`col-9 ${style['column-adjust']}`} >
      <div className={`${style['search-wrap']}`}>
        <form className={`form-group ${style['form-group-adjust']}`}>
          <div className={`row ${style['row-adjust']} d-flex dropdown`}>
            <input className={`col-11 ${style['search-input']}`} type="text" onClick={()=>{
              props.handleSearch({target:{value: ''}})
              props.suggestionToggler();
          }} onChange={(e)=> (props.handleSearch(e))} data-toggle="dropdown" placeholder="What are you looking for today?" aria-label="Search..." id="menu1" aria-describedby="basic-addon1"></input>
            <div className={`col-1 ${style['search-icon-wrapper']}`}>
              <div className={`${style['search-icon']} ${style['lowes-icon']}`}>{"\uEB30"}</div>
            </div>

              <div className={`container dropdown-menu ${style.liner}`} role="menu" aria-labelledby="menu1">
                <div className={`row ${style['row-adjust']}`}>
                  <div className={`col-3 ${style['search-item']}`}>
                    {props.filteredList !== null ? 
                      props.filteredList.map((entry, i) => {
                        return <li className={`${style['search-item']}`} key={`${i}`} ><a href="#">{entry}</a></li>
                      })
                      : 
                      null
                    }
                  </div>
                  <div className={`col-9 ${style['padding-adjust']}`}>
                    <div className={`${style['product-suggestion']}`}>Product Suggestions</div>
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