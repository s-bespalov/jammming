import {DeezerSecrets} from "../secrets/secrets";

const appId = DeezerSecrets.id;
const appSecret = DeezerSecrets.secret;
const redirectUrl = "http://localhost:3000/";
const proxy = "https://cors-anywhere.herokuapp.com/";
let userAccessToken = "";
let expires;
let user;

const Deezer = {
  getAccessToken: function() {
    if(userAccessToken) {
      return userAccessToken;
    }

    const accessRegx = /access_token=([^&]*)/;
    const startTokenIdx = 13;
    const expiresRegx = /expires=([^&]*)/;
    const startExpiresIdx = 8;

    let accessMatch = window.location.href.match(accessRegx);
    let expiresMath = window.location.href.match(expiresRegx);
    if(accessMatch && expiresMath) {
      console.log(window.location.href); // DEBUG:
      userAccessToken = accessMatch[0].substring(startTokenIdx);
      expires = Number(expiresMath[0].substring(startExpiresIdx));
      return userAccessToken;
    }

    const url =
      `https://connect.deezer.com/oauth/auth.php?` +
      `app_id=${appId}&redirect_uri=${redirectUrl}` +
      `&perms=basic_access,email,manage_library` +
      `&response_type=token`;
    window.location = url;
  },

  getUserId: async function(){
    if(user) {
      return;
    }

    const url = `https://api.deezer.com/user/me?` +
      `access_token=${userAccessToken}`;

    const response = await fetch(proxy + url);
    const userData = await response.json();

    user = {id: userData.id};
  },

  search: async function(term) {
    const url = `https://api.deezer.com/search?q=track:${term}` +
      `&access_token=${userAccessToken}`;

    const response = await fetch(proxy + url);
    const tracks = await response.json();

    return tracks.data.map(track => {
      return {
        id: track.id,
        name: track.title,
        artist: track.artist.name,
        album: track.album.title,
        uri: track.link
      }
    });
  },

  savePlayList: async function(name, tracks) {
    await this.getUserId();

    //create new playlist
    const url = `https://api.deezer.com/user/${user.id}/playlists` +
      `?access_token=${userAccessToken}` +
      `&method=POST`+
      `&title=${name}`;
    const response = await fetch(proxy + url, {method: 'POST'});
    const playList = await response.json();

    //add songs to the playlist
    const urlplay = `https://api.deezer.com/playlist/${playList}/tracks` +
      `?access_token=${userAccessToken}` +
      `&method=POST`;
    const responsePlay = await fetch(proxy + urlplay, {
      method: 'POST',
      body: JSON.stringify({
        songs: tracks.join()
      }),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
    });

    console.log(responsePlay);
  }

}

export default Deezer;
