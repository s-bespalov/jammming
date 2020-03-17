import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import {SessionKeys} from '../App/App';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.searchOptions = {
      "Track": "track",
      "Artist": "artist",
      "Album": "album"
    }
    const savedTerm = sessionStorage.getItem(SessionKeys.SEARCH_QUERY_KEY);
    const savedSearchFor = sessionStorage.getItem(SessionKeys.SEARCH_FOR);
    this.state = {
      term: savedTerm ? savedTerm : "",
      searchFor: savedSearchFor ? savedSearchFor : this.searchOptions["Track"]
    };
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.getSearchForClass = this.getSearchForClass.bind(this);
    this.renderSearchOptions = this.renderSearchOptions.bind(this);
    this.handleSearchForChange = this.handleSearchForChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term, this.state.searchFor);
  }

  handleTermChange(event) {
    sessionStorage.setItem(SessionKeys.SEARCH_QUERY_KEY, event.target.value);
    this.setState(
      {
        term: event.target.value
      }
    );
  }

  handleSearchForChange(option) {
    sessionStorage.setItem(SessionKeys.SEARCH_FOR, option);
    this.setState({
      searchFor: option
    });
  }

  getSearchForClass(option) {
    return this.state.searchFor === option ? 'active' : '';
    //return 'active';
  }

  renderSearchOptions() {
    return Object.keys(this.searchOptions).map(option => {
        const optionValue = this.searchOptions[option];
        return (
          <li
            key = {optionValue}
            className = {this.getSearchForClass(optionValue)}
            onClick = {this.handleSearchForChange.bind(this, optionValue)}
          >
            {option}
          </li>
        );
      }
    );
  }

  render() {
    return (
      <div className="SearchBar">
        <ul>
          {this.renderSearchOptions()}
        </ul>
        <input
          placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange}
          value={this.state.term}
        />
        <button className="SearchButton" onClick={this.search}>SEARCH</button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSearch: PropTypes.func
}
