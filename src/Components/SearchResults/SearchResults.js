import React from 'react';
import PropTypes from 'prop-types';
import './SearchResults.css';
import {TrackList} from '../TrackList/TrackList';

export class SearchResults extends React.Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList searchResults={this.props.searchResults} />
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.array
}
