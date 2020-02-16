import React from 'react';
import PropTypes from 'prop-types';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"} onChange={this.handleNameChange}/>
        <TrackList
          tracks={this.props.tracks}
          onRemove={this.props.onRemove}
          isRemoval={true}
        />
        <button
          className="Playlist-save"
          nClick={this.onSave}
        >
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

Playlist.propTypes = {
  tracks: PropTypes.array,
  onRemove: PropTypes.func,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func
}
