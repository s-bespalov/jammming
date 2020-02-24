import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Deezer from '../../util/Deezer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    Deezer.getAccessToken();
  }

  addTrack(track) {
    if(this.state.playlistTracks.some(ltrack => ltrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState();
  }

  removeTrack(track) {
    let newPlaylist = this.playlistTracks
      .filter(ltrack => ltrack.id === track.id);

    this.setState(
      {
        playlistTracks: newPlaylist
      }
    );
  }

  savePlayList() {
    let trackURIs; //step 63
  }

  search(term) {
    Deezer.search(term)
      .then(tracks => {
        console.log(tracks);
      })
  }

  updatePlaylistName(name) {
    this.setState(
      {
        playlistName: name
      }
    );
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              name={this.state.playlistName}
              tracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
