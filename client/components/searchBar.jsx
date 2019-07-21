import React, { Component } from 'react';
import Suggestion from './searchBarSuggestions.jsx';
import style from '../style/main.less';

const SearchBar = (props) => {
  
  return ( 
    <div className={`col-9 ${style.shrinkHeight} ${style['column-adjust']}`} >
      <div className={`${style['search-wrap']}`}>
        <form className={`form-group ${style['form-group-adjust']}`}>
          <div className={`row ${style['row-adjust']} d-flex dropdown`}>
            <input className={`col-8 col-sm-10 ${style['search-input']}`} value={props.searching} autoComplete="rutjfkde" type="text" onClick={()=>{
              props.handleSearch({target:{value: ''}})
              props.suggestionToggler();
          }} onChange={(e)=> (props.handleSearch(e))} data-toggle="dropdown" placeholder="What are you looking for today?" aria-label="Search" id="" aria-describedby="basic-addon1"></input>
            <div className={`col-sm-2 ${style['search-icon-wrapper']}`}>
              <div className={`${style['search-icon']} ${style['lowes-icon']}`}>{"\uEB30"}</div>
            </div>

              <div className={`container dropdown-menu ${style.liner}`} role="menu" aria-labelledby="menu1">
                <div className={`row ${style['row-adjust']}`}>
                  <div className={`col-3 ${style['search-item']} ${style.scrollbar} ${style['destroy-padding-left']} ${style['destroy-adding-right']}`}>
                    {props.filteredList !== null ? 
                      props.filteredList.map((entry, i) => {
                        return <li className={`${style['search-item']} ${style.category}`} onMouseOver={()=>props.handleSearch({target:{value: entry}}, true)} key={`${i}`} ><a href="#">{entry}</a></li>
                      })
                      : 
                      null
                    }
                  </div>
                  <div className={`col-md-12 col-lg-9 ${style['padding-adjust']} ${style.scrollbar}`}>
                    <div className={`${style['product-suggestion']}`}>Product Suggestions</div>
                    {props.suggestionList.map((suggestion, i) => {
                      return <Suggestion key={i} suggestion={suggestion} reviewStat={props.reviewStat[suggestion.id-1]} clearSearch={props.clearSearch}/>
                    })}
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