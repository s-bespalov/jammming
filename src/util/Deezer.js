import {DeezerSecrets} from "../secrets/secrets";

const appId = DeezerSecrets.id;
const appSecret = DeezerSecrets.secret;
const redirectUrl = "http://localhost:3000/";
let userAccessToken = "";
let expires;

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

  search: async function(term) {
    const url = `https://api.deezer.com/search?q=track:${term}` +
      `&access_token=${userAccessToken}`;

    const response = await fetch(url);
    const myJson = await response.json();

    return JSON.parse(myJson).data.map(track => {
      return {
        id: track.id,
        name: track.title,
        artist: track.artist.name,
        album: track.album.title,
        uri: track.link
      }
    });
  },

  savePlayList: function(name, tracks) {
    return;
  }

}

export default Deezer;
