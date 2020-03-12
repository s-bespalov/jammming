import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import {Dialog} from '../Dialog/Dialog';
import {DialogType} from '../Dialog/Dialog';
import Deezer from '../../util/Deezer';
import {ResultStates} from '../../util/Deezer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: [],
      showDialog: false,
      dialogType: "empty",
      onOpen: undefined
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlayList = this.savePlayList.bind(this);
    this.search = this.search.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }

  addTrack(track) {
    if(this.state.playlistTracks.some(ltrack => ltrack.id === track.id)) {
      return;
    }
    this.state.playlistTracks.push(track);
    this.setState({});
  }

  removeTrack(track) {
    let newPlaylist = this.state.playlistTracks
      .filter(ltrack => ltrack.id !== track.id);

    this.setState(
      {
        playlistTracks: newPlaylist
      }
    );
  }

  savePlayList() {
    let trackURIs = this.state.playlistTracks.map(track => track.id);
    if (trackURIs.length < 1) {
      this.setState({
        showDialog: true,
        dialogType: DialogType.NothingSave
      });
      return;
    }

    this.setState({
      showDialog: true,
      dialogType: DialogType.Saving
    });
    Deezer.savePlayList(
      this.state.playlistName,
      trackURIs
    ).then(result => {
      this.handleResult(result);
    });
  }

  search(term) {
    Deezer.getAccessToken();
    Deezer.search(term)
      .then(tracks => {
        if(tracks.status) {
          this.handleResult(tracks);
          return;
        }
        this.setState({searchResults: tracks})
      });
  }

  updatePlaylistName(name) {
    this.setState(
      {
        playlistName: name
      }
    );
  }

  handleCloseDialog(clean) {
    if (clean) {
      this.setState({
        showDialog: false,
        playlistName: "New Playlist",
        playlistTracks: []
      })
    } else {
      this.setState({
        showDialog: false
      })
    }

  }

  handleOpenPlaylistInDeezer() {
    Deezer.redirectToPlaylist(this.playlist);
  }

  handleResult(result) {
    if(result.status === ResultStates.Success) {
      this.setState({
          showDialog: true,
          dialogType: DialogType.Saved,
          onOpen: this.handleOpenPlaylistInDeezer.bind({
            playlist: result.playlist
          })
        })
    } else if (result.status === ResultStates.Failed) {
      this.setState({
        showDialog: true,
        dialogType: DialogType.Failed
      })
    } else if (result.status === ResultStates.Expired) {
      this.setState({
        showDialog: true,
        dialogType: DialogType.Expired
      })
    }
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
        {this.state.showDialog ?
          <Dialog
            dialogType={this.state.dialogType}
            onClose={this.handleCloseDialog}
            onOpen={this.state.onOpen}
            onLogin={Deezer.getAccessToken}
          />
          : undefined
        }
      </div>
    );
  }
}

export default App;
