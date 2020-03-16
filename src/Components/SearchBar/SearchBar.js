import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';
import {SessionKeys} from '../App/App';

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {term: sessionStorage.getItem(SessionKeys.SEARCH_QUERY_KEY)};
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(event) {
    sessionStorage.setItem(SessionKeys.SEARCH_QUERY_KEY, event.target.value);
    this.setState(
      {
        term: event.target.value
      }
    );
  }

  render() {
    return (
      <div className="SearchBar">
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
